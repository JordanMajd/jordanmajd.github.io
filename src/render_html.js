const PJSON = require("./pseudo_json");
let fs = require("fs"),
  mold = new (require("mold-template"))();
let { transformTokens } = require("./transform");
let CodeMirror = require("codemirror/addon/runmode/runmode.node.js");
require("codemirror/mode/javascript/javascript.js");
require("codemirror/mode/xml/xml.js");
require("codemirror/mode/css/css.js");
require("codemirror/mode/htmlmixed/htmlmixed.js");

let file,
  epub = false;
for (let arg of process.argv.slice(2)) {
  if (arg == "--epub") epub = true;
  else if (file) throw new Error("Multiple input files");
  else file = arg == "-" ? "/dev/stdin" : arg;
}
if (!file) throw new Error("No input file");

let chapter = /^[^\.]+\/\d{4}_\d{2}_\d{2}_([^\.]+)/.exec(file);
let date = /^[^\.]+\/(\d{4}_\d{2}_\d{2})_[^\.]+/.exec(file)[1];
let directory = /^([^\.]+)\/\d{4}_\d{2}_\d{2}_[^\.]+/.exec(file)[1];

let { tokens, metadata } = transformTokens(
  require("./markdown").parse(fs.readFileSync(file, "utf8"), {}),
  {
    defined: epub ? ["book", "html"] : ["interactive", "html"],
    strip: epub ? "hints" : "",
    takeTitle: true,
    index: false
  }
);

let close = epub ? "/" : "";

let chapters = fs
  .readdirSync(__dirname + "/../" + directory)
  .filter(file => /^\d{4}_\d{2}_\d{2}_\w+\.md$/.test(file))
  .sort()
  .map(file => /^(\d{4}_\d{2}_\d{2}_\w+)\.md$/.exec(file)[1]);
if (epub) chapters.push("hints");

function escapeChar(ch) {
  return ch == "<"
    ? "&lt;"
    : ch == ">"
    ? "&gt;"
    : ch == "&"
    ? "&amp;"
    : "&quot;";
}
function escape(str) {
  return str.replace(/[<>&"]/g, escapeChar);
}

function highlight(lang, text) {
  if (lang == "html") lang = "text/html";
  let result = "";
  CodeMirror.runMode(text, lang, (text, style) => {
    let esc = escape(text);
    result += style
      ? `<span class="${style.replace(/^|\s+/g, "$&cm-")}">${esc}</span>`
      : esc;
  });
  return result;
}

function maybeSplitInlineCode(html) {
  if (html.length <= 16) return html;
  return html.replace(/[.\/](?!\/)/g, `$&<wbr${close}>`);
}

const seenIDs = Object.create(null);
function anchor(token) {
  let id = token.hashID;
  if (!id || id in seenIDs) return "";
  seenIDs[id] = true;
  return `<a class="${id.charAt(
    0
  )}_ident" id="${id}" href="#${id}" tabindex="-1" role="presentation"></a>`;
}

function attrs(token) {
  return token.attrs
    ? token.attrs
        .map(([name, val]) => ` ${name}="${escape(String(val))}"`)
        .join("")
    : "";
}

let linkedChapter = null;

let renderer = {
  fence(token) {
    let config = /\S/.test(token.info) ? PJSON.parse(token.info) : {};
    if (config.hidden) return "";
    let lang = config.lang || "javascript";
    return `\n\n<pre${attrs(
      token
    )} class="snippet cm-s-default" data-language="${lang}" ${
      config.focus ? ' data-focus="true"' : ""
    }${config.sandbox ? ` data-sandbox="${config.sandbox}"` : ""}${
      config.meta ? ` data-meta="${config.meta}"` : ""
    }>${anchor(token)}${highlight(lang, token.content.trimRight())}</pre>`;
  },

  hardbreak() {
    return `<br${close}>`;
  },
  softbreak() {
    return " ";
  },

  text(token) {
    let { content } = token;
    if (linkedChapter != null) content = content.replace(/\?/g, linkedChapter);
    return escape(content);
  },

  hr(token) {
    return "hr ignored";
  },

  html_inline(token) {
    return "html_inline ignored";
  },

  paragraph_open(token) {
    return `\n\n<p${attrs(token)}>${anchor(token)}`;
  },
  paragraph_close() {
    return "</p>";
  },

  heading_open(token) {
    return `\n\n<${token.tag}${attrs(token)}>${anchor(token)}`;
  },
  heading_close(token) {
    return `</${token.tag}>`;
  },

  bullet_list_open(token) {
    return `\n\n<ul${attrs(token)}>`;
  },
  bullet_list_close() {
    return `</ul>`;
  },

  ordered_list_open(token) {
    return `\n\n<ol${attrs(token)}>`;
  },
  ordered_list_close() {
    return `\n\n</ol>`;
  },

  list_item_open() {
    return "\n\n<li>";
  },
  list_item_close() {
    return "</li>";
  },

  table_open() {
    return "\n\n<table>";
  },
  table_close() {
    return "\n\n</table>";
  },
  tbody_open() {
    return "";
  },
  tbody_close() {
    return "";
  },
  tr_open() {
    return "\n\n<tr>";
  },
  tr_close() {
    return "\n\n</tr>";
  },
  td_open() {
    return "<td>";
  },
  td_close() {
    return "</td>";
  },

  html_block(token) {
    return token.content;
  },

  code_inline(token) {
    return `<code>${maybeSplitInlineCode(escape(token.content))}</code>`;
  },

  strong_open() {
    return "<strong>";
  },
  strong_close() {
    return "</strong>";
  },

  em_open() {
    return "<em>";
  },
  em_close() {
    return "</em>";
  },

  sub_open() {
    return "<sub>";
  },
  sub_close() {
    return "</sub>";
  },

  sup_open() {
    return "<sup>";
  },
  sup_close() {
    return "</sup>";
  },

  link_open(token) {
    let alt = token.attrGet("alt"),
      href = token.attrGet("href");
    let maybeChapter = /^(\w+)(#.*)?$/.exec(href);
    if (maybeChapter && chapters.includes(maybeChapter[1])) {
      let number = "";
      if (maybeChapter[1] != "hints") {
        linkedChapter = chapters.indexOf(maybeChapter[1]);
        number = pad(linkedChapter) + "_";
      }
      href =
        number +
        maybeChapter[1] +
        (epub ? ".xhtml" : ".html") +
        (maybeChapter[2] || "");
    }
    return `<a href="${escape(href)}"${alt ? ` alt="${escape(alt)}"` : ""}>`;
  },
  link_close() {
    linkedChapter = null;
    return "</a>";
  },

  inline(token) {
    return renderArray(token.children);
  },

  image(token) {
    let alt = "";
    let className;
    if (token.children && token.children[0] && token.children[0].content) {
      let split = token.children[0].content.split("{");
      alt = split[0];
      if (split.length > 1) {
        className = split[1].split('"')[1];
      }
    }

    let newToken = {
      args: [
        {
          url: token.attrGet("src"),
          className,
          alt
        }
      ]
    };
    return renderer.meta_figure(newToken);
  },

  meta_figure(token) {
    let { url, alt, chapter, className } = token.args[0];
    if (!className) {
      className = !chapter
        ? null
        : "chapter" + (chapter == "true" ? "" : " " + chapter);
    }
    return `<figure${attrs(token)}${
      className ? ` class="${className}"` : ""
    }><img src="${escape(url)}" alt="${escape(alt)}"${close}></figure>`;
  },

  meta_quote_open(token) {
    let { className } = token.args[0];
    return `\n\n<blockquote${className ? ` class="${className}"` : ""}>`;
  },
  meta_quote_close(token) {
    let { author, title } = token.args[0] || {};
    return (
      (author
        ? `\n\n<footer>${escape(author)}${
            title ? `, <cite>${escape(title)}</cite>` : ""
          }</footer>`
        : "") + "\n\n</blockquote>"
    );
  },
  meta_keyname_open() {
    return '<span class="keyname">';
  },
  meta_keyname_close() {
    return "</span>";
  },

  meta_hint_open() {
    return '\n\n<div class="solution"><div class="solution-text">';
  },
  meta_hint_close() {
    return "\n\n</div></div>";
  }
};

function renderArray(tokens) {
  let result = "";
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i],
      f = renderer[token.type];
    if (!f) throw new Error("No render function for " + token.type);
    result += f(token);
  }
  return result;
}

function pad(n) {
  return (n < 10 ? "0" : "") + n;
}

metadata.content = renderArray(tokens);
let index;
if (chapter && (index = chapters.indexOf(date + "_" + chapter[1])) > -1) {
  metadata.chap_num = index;
  if (index > 0) {
    metadata.next_link = `${chapters[index - 1]}`;
  }
  if (index < chapters.length - 1) {
    metadata.prev_link = `${chapters[index + 1]}`;
  }
}
metadata.category = directory.toLocaleUpperCase();
metadata.date = date;

let template = mold.bake(
  "chapter",
  fs.readFileSync(__dirname + `/chapter.html`, "utf8")
);

let dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};

let year = parseInt(date.slice(0, 4));
let month = parseInt(date.slice(5, 7)) - 1;
let day = parseInt(date.slice(9));

let dateObject = new Date(year, month, day);

metadata.date = dateObject.toLocaleDateString("en-us", dateOptions);

console.log(template(metadata));

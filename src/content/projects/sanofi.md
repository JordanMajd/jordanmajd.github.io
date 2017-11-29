---
title: Sanofi Holographic
date: 2017-09-26
layout: post.html
image: /img/projects/sanofi.jpg
status: Shipped
engine: Unity
platform: Microsoft HoloLens
description: Sanofi Holographic is an immersive story which takes users on a journey which demonstrates how augmented and virtual reality can be used for data visualization, therapeutics and pharmaceuticals.
ready: true
---

![Charcoal storyboard of someone using an AR headset to visualize an influenza outbreak.](/img/projects/sanofi.jpg)
<span class="subtitle">Charcoal storyboard demonstrating using augmented reality to visualize the supply chain management of an influenza virus.</span>

Sanofi Holographic is an immersive story which takes users on a journey demonstrating how augmented and virtual reality can be used across the pharmaceutical industry. The story walks users through real world use cases; from visualizing [PyMOL][pymol] data of antibodies interacting with the influenza virus, to supply chain management of an outbreak, to therapeutic uses for pain management and rehabilitation such as the [Walk Again Project][walkagain].

I was responsible for implementation of game logic using both C# scripts and Unity's animator:

- Seamless, low memory asynchronous loading and unloading of scenes.
- Event handling for game logic, animations, audio, transitions etc...
- Voice and gesture controls.

I also had a hand in integrating assets from our art team. Responsibilities included:

- Importing and optimizing 3D and other digital assets.
- Assigning and configuring custom materials to models.
- Ensuring meshes were low poly and animated well
- Compressing audio tracks to maintain high fidelity sound and low memory footprint.

Performance is critical, especially when on hardware as limited as the HoloLens. Our team worked together to use of custom shaders, GPU instanced meshes, mesh reduction, audio compression, baked lighting and other techniques to ensure a quality user experience.

[pymol]: https://pymol.org/2/
[walkagain]: https://today.duke.edu/2016/08/paraplegics-take-step-regain-movement

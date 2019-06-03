# Sanofi Holographic
![{"shield"}](https://img.shields.io/badge/Engine-Unity-red.svg)
![{"shield"}](https://img.shields.io/badge/Platform-Microsoft%20HoloLens-blue.svg)

![Charcoal storyboard of someone using an AR headset to visualize an influenza outbreak.{"square-framed"}](/img/project/sanofi.jpg)

{{quote {className: "noquote"}

Charcoal storyboard demonstrating using augmented reality to visualize the supply chain management of an influenza virus.

quote}}


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

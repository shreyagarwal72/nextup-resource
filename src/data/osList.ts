export interface OsProject {
  name: string;
  category: string;
  description: string;
  links: { label: string; url: string }[];
  flags: string;
}

export const osCategories: string[] = [
  "Open Source OS",
  "Popular OS",
  "Web Clone \u2013 Windows",
  "Web Clone \u2013 macOS",
  "Web Clone \u2013 Linux",
  "Indie Web OS",
  "Portfolio / Personal OS",
  "Retro & Vintage Web",
  "Dev Resources & Books",
];

export const osProjects: OsProject[] = [
  {
    "name": "9front",
    "category": "Open Source OS",
    "description": "A fork of Plan 9, designed for distributed, networked computing.",
    "links": [
      {
        "label": "Source",
        "url": "http://9front.org"
      }
    ],
    "flags": ""
  },
  {
    "name": "AROS",
    "category": "Open Source OS",
    "description": "Research Operating System is a lightweight, efficient, and flexible desktop operating system, designed to help you make the most of your computer.",
    "links": [
      {
        "label": "Source",
        "url": "https://aros.sourceforge.io/"
      }
    ],
    "flags": ""
  },
  {
    "name": "AlmeidaOS",
    "category": "Open Source OS",
    "description": "x86-64 OS with its own bootloader, scheduler and limited libc all written from scratch",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/PauloMigAlmeida/AlmeidaOS"
      }
    ],
    "flags": ""
  },
  {
    "name": "Animal",
    "category": "Open Source OS",
    "description": "32 bit multithreaded operating system (formerly Gramado)",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/frednora/animal"
      }
    ],
    "flags": ""
  },
  {
    "name": "Asterinas",
    "category": "Open Source OS",
    "description": "Linux-ABI-compatible kernel project written in Rust, based on a \"framekernel architecture\"",
    "links": [
      {
        "label": "Source",
        "url": "https://asterinas.github.io/"
      }
    ],
    "flags": ""
  },
  {
    "name": "AurixOS",
    "category": "Open Source OS",
    "description": "A small multiplatform Operating System designed for developers and creators",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/aurixos/os"
      }
    ],
    "flags": ""
  },
  {
    "name": "AquilaOS",
    "category": "Open Source OS",
    "description": "Operating System designed to be POSIX compliant and mostly ISA transparent",
    "links": [
      {
        "label": "Source",
        "url": "https://aquilaos.com"
      }
    ],
    "flags": ""
  },
  {
    "name": "Arikoto",
    "category": "Open Source OS",
    "description": "A Limine protocol, x86_64, C based personal OS project inspired by ToaruOS",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/IAmTheNerdNextDoor/arikoto"
      }
    ],
    "flags": ""
  },
  {
    "name": "BareMetal",
    "category": "Open Source OS",
    "description": "64 bit operating system written in Assembly for x86-64",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/ReturnInfinity/BareMetal"
      }
    ],
    "flags": ""
  },
  {
    "name": "Basekernel",
    "category": "Open Source OS",
    "description": "A simple OS kernel for research, teaching, and fun",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/dthain/basekernel"
      }
    ],
    "flags": ""
  },
  {
    "name": "BoneOS",
    "category": "Open Source OS",
    "description": "OS for everyone built by everyone",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/Bone-Project/BoneOS"
      }
    ],
    "flags": ""
  },
  {
    "name": "Bottlerocket OS",
    "category": "Open Source OS",
    "description": "Linux-based OS meant for hosting containers.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/bottlerocket-os/bottlerocket"
      }
    ],
    "flags": ""
  },
  {
    "name": "Brutal",
    "category": "Open Source OS",
    "description": "An OS inspired by brutalist design combining UNIX ideals with modern engineering",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/brutal-org/brutal"
      }
    ],
    "flags": ""
  },
  {
    "name": "cavOS",
    "category": "Open Source OS",
    "description": "Amd64 operating system in C, simple and readable codebase",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/malwarepad/cavOS"
      }
    ],
    "flags": ""
  },
  {
    "name": "Charlotte",
    "category": "Open Source OS",
    "description": "CharlotteOS kernel in Rust",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/charlotte-os/charlotte-core"
      }
    ],
    "flags": ""
  },
  {
    "name": "ChibiOS",
    "category": "Open Source OS",
    "description": "a complete development environment for embedded applications including RTOS and HAL",
    "links": [
      {
        "label": "Source",
        "url": "http://www.chibios.org/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Clive",
    "category": "Open Source OS",
    "description": "A unikernel OS inspired by Plan9 and Nix",
    "links": [
      {
        "label": "Source",
        "url": "https://lsub.org/ls/clive.html"
      }
    ],
    "flags": ""
  },
  {
    "name": "Cyjon",
    "category": "Open Source OS",
    "description": "pure x64 assembly language operating system",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/CorruptedByCPU/Cyjon/"
      }
    ],
    "flags": ""
  },
  {
    "name": "DragonOS",
    "category": "Open Source OS",
    "description": "An x86-64 OS build from scratch.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/fslongjin/DragonOS"
      }
    ],
    "flags": ""
  },
  {
    "name": "Dreamos64",
    "category": "Open Source OS",
    "description": "An x86-64 hobby os built from scratch",
    "links": [
      {
        "label": "Source",
        "url": "https://codeberg.org/dreamos82/DreamOs64"
      }
    ],
    "flags": ""
  },
  {
    "name": "Embox",
    "category": "Open Source OS",
    "description": "Configurable operating system kernel for resource constrained and embedded systems.",
    "links": [
      {
        "label": "Source",
        "url": "https://embox.github.io/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Ethereal",
    "category": "Open Source OS",
    "description": "Advanced modular OS with networking, USB and a GUI-enabled userspace.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/sasdallas/Ethereal"
      }
    ],
    "flags": ""
  },
  {
    "name": "ExectOS",
    "category": "Open Source OS",
    "description": "Modern, EFI-enabled OS implementing the XT architecture with NT drivers compatibility layer.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/xt-sys/exectos"
      }
    ],
    "flags": ""
  },
  {
    "name": "Fern-Night",
    "category": "Open Source OS",
    "description": "C language operating system",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/CorruptedByCPU/Fern-Night/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Fiwix",
    "category": "Open Source OS",
    "description": "A UNIX-like kernel for the i386 architecture.",
    "links": [
      {
        "label": "Source",
        "url": "https://www.fiwix.org/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Fomos",
    "category": "Open Source OS",
    "description": "Experimental OS, built with Rust.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/Ruddle/Fomos"
      }
    ],
    "flags": ""
  },
  {
    "name": "FreeRTOS",
    "category": "Open Source OS",
    "description": "IoT operating system for microcontrollers, by Amazon.",
    "links": [
      {
        "label": "Source",
        "url": "https://www.freertos.org/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Genode",
    "category": "Open Source OS",
    "description": "A FOSS OS framework consisting of a microkernel abstraction layer and userspace components",
    "links": [
      {
        "label": "Source",
        "url": "https://genode.org/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Gloire",
    "category": "Open Source OS",
    "description": "An OS built with the Ironclad kernel and GNU tools.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/streaksu/Gloire"
      }
    ],
    "flags": ""
  },
  {
    "name": "GreenteaOS",
    "category": "Open Source OS",
    "description": "A free OS designed to be compatible with Windows executables",
    "links": [
      {
        "label": "Source",
        "url": "https://greenteaos.github.io/"
      }
    ],
    "flags": ""
  },
  {
    "name": "HalideOS",
    "category": "Open Source OS",
    "description": "experimental operating system written entirely from scratch.",
    "links": [
      {
        "label": "Source",
        "url": "https://gdsc-kiit.github.io/project-halide/"
      }
    ],
    "flags": ""
  },
  {
    "name": "HarveyOS",
    "category": "Open Source OS",
    "description": "A distributed operating system",
    "links": [
      {
        "label": "Source",
        "url": "https://harvey-os.org/"
      }
    ],
    "flags": ""
  },
  {
    "name": "HelenOS",
    "category": "Open Source OS",
    "description": "multikernel multiserver OS",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/HelenOS/helenos"
      }
    ],
    "flags": ""
  },
  {
    "name": "Hermit",
    "category": "Open Source OS",
    "description": "A Rust-based, lightweight unikernel",
    "links": [
      {
        "label": "Source",
        "url": "https://hermit-os.org/"
      }
    ],
    "flags": ""
  },
  {
    "name": "House",
    "category": "Open Source OS",
    "description": "Haskell User's Operating System and Environment.",
    "links": [
      {
        "label": "Source",
        "url": "https://programatica.cs.pdx.edu//House/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Hubris",
    "category": "Open Source OS",
    "description": "operating system for microcontrollers developed by Oxide Computer Company in Rust",
    "links": [
      {
        "label": "Source",
        "url": "https://hubris.oxide.computer/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Illumos",
    "category": "Open Source OS",
    "description": "Unix operating system providing next-gen features for downstream distributions",
    "links": [
      {
        "label": "Source",
        "url": "https://illumos.org/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Interim",
    "category": "Open Source OS",
    "description": "Minimalist OS with concepts from Lisp machines and Plan9",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/mntmn/interim"
      }
    ],
    "flags": ""
  },
  {
    "name": "JSD-OS",
    "category": "Open Source OS",
    "description": "A small operating system for 32 bit x86.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/pgrAm/JSD-OS"
      }
    ],
    "flags": ""
  },
  {
    "name": "Jehanne",
    "category": "Open Source OS",
    "description": "OS inspired by Plan9, 9front and Harvey OS",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/JehanneOS/jehanne/"
      }
    ],
    "flags": ""
  },
  {
    "name": "KiddieOS",
    "category": "Open Source OS",
    "description": "UNIX-like 64-bit operating system written in Assembly, C++.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/FrancisBFTC/KiddieOS_Development"
      }
    ],
    "flags": ""
  },
  {
    "name": "KnightOS",
    "category": "Open Source OS",
    "description": "for z80 calculators",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/KnightOS/KnightOS"
      }
    ],
    "flags": ""
  },
  {
    "name": "KolibriOS",
    "category": "Open Source OS",
    "description": "MenuetOS fork",
    "links": [
      {
        "label": "Source",
        "url": "http://www.kolibrios.org"
      }
    ],
    "flags": ""
  },
  {
    "name": "Lateralus OS",
    "category": "Open Source OS",
    "description": "Bare-metal OS with its own pipeline-native language, compiler, and VM",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/bad-antics/lateralus-lang"
      }
    ],
    "flags": ""
  },
  {
    "name": "L4re",
    "category": "Open Source OS",
    "description": "OS and hypervisor for security/safety-critical and virtualization-enabled applications.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/kernkonzept/l4re-core"
      }
    ],
    "flags": ""
  },
  {
    "name": "LemonOS",
    "category": "Open Source OS",
    "description": "UNIX-like 64-bit operating system written in C++.",
    "links": [
      {
        "label": "Source",
        "url": "https://lemonos.org/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Maestro",
    "category": "Open Source OS",
    "description": "Operating system written in Rust, aiming to be a lightweight version of Linux",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/maestro-os/maestro"
      }
    ],
    "flags": ""
  },
  {
    "name": "Mako",
    "category": "Open Source OS",
    "description": "Hobby OS for x86 from scratch, written in C",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/AjayMT/mako"
      }
    ],
    "flags": ""
  },
  {
    "name": "MaslOS",
    "category": "Open Source OS",
    "description": "A 64 bit GUI multitasking Hobby OS written mostly from scratch in C++/C/ASM.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/marceldobehere/MaslOS"
      }
    ],
    "flags": ""
  },
  {
    "name": "MeetixOS",
    "category": "Open Source OS",
    "description": "A hobby OS written in modern C++20 which aims to be Unix-like.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/MarcoCicognani/MeetixOS"
      }
    ],
    "flags": ""
  },
  {
    "name": "MentOS",
    "category": "Open Source OS",
    "description": "An educational 32-bit linux-like Operating System.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/mentos-team/MentOS"
      }
    ],
    "flags": ""
  },
  {
    "name": "MenuetOS",
    "category": "Open Source OS",
    "description": "Hobby OS supporting 32 and 64 bit, written in Assembly language",
    "links": [
      {
        "label": "Source",
        "url": "http://www.menuetos.net/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Mimiker",
    "category": "Open Source OS",
    "description": "Simple unix-like operating system for education and research. MIPS microkernel.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/cahirwpz/mimiker"
      }
    ],
    "flags": ""
  },
  {
    "name": "Mimosa",
    "category": "Open Source OS",
    "description": "Research Operating System that runs Scheme on bare-metal",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/udem-dlteam/mimosa"
      }
    ],
    "flags": ""
  },
  {
    "name": "Minoca OS",
    "category": "Open Source OS",
    "description": "General purpose OS, written in C",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/minoca/os"
      }
    ],
    "flags": ""
  },
  {
    "name": "MollenOS",
    "category": "Open Source OS",
    "description": "Modern OS built with focus on abstraction and a modular design",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/Meulengracht/MollenOS"
      }
    ],
    "flags": ""
  },
  {
    "name": "myOS",
    "category": "Open Source OS",
    "description": "Under development by a single Undergraduate",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/badnikhil/MyOS"
      }
    ],
    "flags": ""
  },
  {
    "name": "MyXomycota",
    "category": "Open Source OS",
    "description": "Monolithic kernel in C",
    "links": [
      {
        "label": "Source",
        "url": "https://sourceforge.net/projects/myxomycota/"
      }
    ],
    "flags": ""
  },
  {
    "name": "NESOS",
    "category": "Open Source OS",
    "description": "An OS for the Nintendo Entertainment System!",
    "links": [
      {
        "label": "Source",
        "url": "https://notin.tokyo/nesos/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Nanos",
    "category": "Open Source OS",
    "description": "Unikernel that is linux-compatible, written in C",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/nanovms/nanos"
      }
    ],
    "flags": ""
  },
  {
    "name": "NodeOS",
    "category": "Open Source OS",
    "description": "OS using NodeJS and Linux",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/NodeOS/NodeOS"
      }
    ],
    "flags": ""
  },
  {
    "name": "Northport",
    "category": "Open Source OS",
    "description": "Monolithic kernel and support libraries for riscv64 and x86_64.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/DeanoBurrito/northport"
      }
    ],
    "flags": ""
  },
  {
    "name": "PathOS",
    "category": "Open Source OS",
    "description": "Hobby OS based on MikeOS, written in Assembly Language",
    "links": [
      {
        "label": "Source",
        "url": "http://path-os.duckdns.org/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Pidi OS",
    "category": "Open Source OS",
    "description": "Independent and minimalistic OS",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/GandelXIV/pidi-os"
      }
    ],
    "flags": ""
  },
  {
    "name": "PonyOS",
    "category": "Open Source OS",
    "description": "ToaruOS-based, My Little Pony themed OS",
    "links": [
      {
        "label": "Source",
        "url": "https://ponyos.org/"
      }
    ],
    "flags": ""
  },
  {
    "name": "PouplyOS",
    "category": "Open Source OS",
    "description": "Simple OS for fun and learning",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/mtribiere/PoulpyOS"
      }
    ],
    "flags": ""
  },
  {
    "name": "PureDarwin",
    "category": "Open Source OS",
    "description": "Community project to extend Darwin into a complete, usable operating system",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/PureDarwin/PureDarwin/wiki"
      }
    ],
    "flags": ""
  },
  {
    "name": "Qubes OS",
    "category": "Open Source OS",
    "description": "Security-focused OS built on the Xen hypervisor, isolates compartments by trust level.",
    "links": [
      {
        "label": "Source",
        "url": "https://qubes-os.org"
      }
    ],
    "flags": ""
  },
  {
    "name": "RavynOS",
    "category": "Open Source OS",
    "description": "A BSD-based OS aiming for macOS-like experience and compatibility (formerly airyxOS)",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/ravynsoft/ravynos"
      }
    ],
    "flags": ""
  },
  {
    "name": "Redox",
    "category": "Open Source OS",
    "description": "written in Rust",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/redox-os/redox"
      }
    ],
    "flags": ""
  },
  {
    "name": "rou2exOS",
    "category": "Open Source OS",
    "description": "A second iteration of the DOS-like hobby OS written in Rust and x86_64 assembly",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/krustowski/rou2exOS"
      }
    ],
    "flags": ""
  },
  {
    "name": "Sanos",
    "category": "Open Source OS",
    "description": "Minimalistic 32-bit x86 operating system kernel for network server appliances.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/ringgaard/sanos"
      }
    ],
    "flags": ""
  },
  {
    "name": "SayoriOS",
    "category": "Open Source OS",
    "description": "Hobby OS for x86 computers, written in C",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/pimnik98/SayoriOS"
      }
    ],
    "flags": ""
  },
  {
    "name": "Sculpt OS",
    "category": "Open Source OS",
    "description": "Genode based OS",
    "links": [
      {
        "label": "Source",
        "url": "https://genode.org/download/sculpt"
      }
    ],
    "flags": ""
  },
  {
    "name": "Serenity",
    "category": "Open Source OS",
    "description": "Graphical Unix-like operating system for x86 computers",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/SerenityOS/serenity"
      }
    ],
    "flags": ""
  },
  {
    "name": "SimpleOS",
    "category": "Open Source OS",
    "description": "Simple Operating System coded in C and Assembly",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/xing1357/SimpleOS"
      }
    ],
    "flags": ""
  },
  {
    "name": "Snowdrop OS",
    "category": "Open Source OS",
    "description": "a homebrew operating system from scratch, in assembly language",
    "links": [
      {
        "label": "Source",
        "url": "http://sebastianmihai.com/snowdrop/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Sortix",
    "category": "Open Source OS",
    "description": "Hobby OS in C and C++",
    "links": [
      {
        "label": "Source",
        "url": "https://sortix.org/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Stanix",
    "category": "Open Source OS",
    "description": "Open source modular hobby OS in C with dynamic linking and a page cache.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/tayoky/stanix"
      }
    ],
    "flags": ""
  },
  {
    "name": "Syllable",
    "category": "Open Source OS",
    "description": "Successor of AtheOS, in the tradition of Amiga and BeOS.",
    "links": [
      {
        "label": "Source",
        "url": "http://syllable.metaproject.frl/"
      }
    ],
    "flags": ""
  },
  {
    "name": "SynestiaOS",
    "category": "Open Source OS",
    "description": "32/64 bit operating system written in C for arm platform",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/SynestiaOS/SynestiaOS"
      }
    ],
    "flags": ""
  },
  {
    "name": "TempleOS",
    "category": "Open Source OS",
    "description": "Religious OS",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/minexew/TempleOS"
      }
    ],
    "flags": ""
  },
  {
    "name": "Theseus",
    "category": "Open Source OS",
    "description": "Modern experimental OS written from scratch in Rust",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/theseus-os/Theseus"
      }
    ],
    "flags": ""
  },
  {
    "name": "Thor",
    "category": "Open Source OS",
    "description": "64bit operating system mostly written in C++",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/wichtounet/thor-os"
      }
    ],
    "flags": ""
  },
  {
    "name": "ToaruOS",
    "category": "Open Source OS",
    "description": "Hobby operating system from scratch",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/klange/toaruos"
      }
    ],
    "flags": ""
  },
  {
    "name": "Týndur",
    "category": "Open Source OS",
    "description": "Hobby operating system by the Lowlevel community. Written in C and Pascal",
    "links": [
      {
        "label": "Source",
        "url": "http://www.tyndur.org/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Ultron OS",
    "category": "Open Source OS",
    "description": "x86 Operating System written in C++, High School Project",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/aswinmohanme/ultronOS"
      }
    ],
    "flags": ""
  },
  {
    "name": "Unikraft",
    "category": "Open Source OS",
    "description": "A modular unikernel for specialization, high efficiency, and security",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/unikraft/unikraft"
      }
    ],
    "flags": ""
  },
  {
    "name": "Vinix",
    "category": "Open Source OS",
    "description": "An effort to write a modern OS in the V programming language",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/vlang/vinix"
      }
    ],
    "flags": ""
  },
  {
    "name": "Visopsys",
    "category": "Open Source OS",
    "description": "Open Source Hobby OS developed since 1997",
    "links": [
      {
        "label": "Source",
        "url": "https://visopsys.org/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Windows 95 in Electron",
    "category": "Open Source OS",
    "description": "Hobby Windows 95 implementation in Electron",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/felixrieseberg/windows95"
      }
    ],
    "flags": ""
  },
  {
    "name": "Xv6",
    "category": "Open Source OS",
    "description": "A teaching operating system developed for MIT's operating systems course",
    "links": [
      {
        "label": "Source",
        "url": "https://pdos.csail.mit.edu/6.828/2019/xv6.html"
      }
    ],
    "flags": ""
  },
  {
    "name": "ZealOS",
    "category": "Open Source OS",
    "description": "Modernized, professional fork of TempleOS.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/Zeal-Operating-System/ZealOS"
      }
    ],
    "flags": ""
  },
  {
    "name": "ackOS",
    "category": "Open Source OS",
    "description": "A simple 64-bit operating system.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/ackOS-project/ackOS"
      }
    ],
    "flags": ""
  },
  {
    "name": "aurora_os",
    "category": "Open Source OS",
    "description": "Written in Rust.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/Athryx/aurora_os"
      }
    ],
    "flags": ""
  },
  {
    "name": "dahliaOS",
    "category": "Open Source OS",
    "description": "Modern, secure, lightweight OS combining GNU/Linux and Fuchsia OS.",
    "links": [
      {
        "label": "Source",
        "url": "https://dahliaos.io"
      }
    ],
    "flags": ""
  },
  {
    "name": "duckOS",
    "category": "Open Source OS",
    "description": "A hobby UNIX-like OS with a graphical window manager for x86 computers.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/byteduck/duckOS"
      }
    ],
    "flags": ""
  },
  {
    "name": "eggos",
    "category": "Open Source OS",
    "description": "A Go unikernel running on x86 bare metal",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/icexin/eggos"
      }
    ],
    "flags": ""
  },
  {
    "name": "emerald",
    "category": "Open Source OS",
    "description": "An operating system kernel written for fun in C",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/Abb1x/emerald"
      }
    ],
    "flags": ""
  },
  {
    "name": "gopher-os",
    "category": "Open Source OS",
    "description": "A proof of concept OS kernel written in Go",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/gopher-os/gopher-os"
      }
    ],
    "flags": ""
  },
  {
    "name": "hhuOS",
    "category": "Open Source OS",
    "description": "Small OS written in C++ and Assembler for the x86-architecture, teaching-focused.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/hhuOS/hhuOS"
      }
    ],
    "flags": ""
  },
  {
    "name": "hydrogen",
    "category": "Open Source OS",
    "description": "toy OS, 64-bit, preemptive multitasking kernel supporting EFI, PCIe, SATA, HFS+.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/mszoek/hydrogen"
      }
    ],
    "flags": ""
  },
  {
    "name": "lyre",
    "category": "Open Source OS",
    "description": "x86 kernel and distribution powered by mlibc and GNU userland tools.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/lyre-os/lyre"
      }
    ],
    "flags": ""
  },
  {
    "name": "managarm",
    "category": "Open Source OS",
    "description": "Pragmatic microkernel-based OS with fully asynchronous I/O",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/managarm/managarm"
      }
    ],
    "flags": ""
  },
  {
    "name": "menix",
    "category": "Open Source OS",
    "description": "A minimal and expandable Unix-like operating system.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/menix-os/menix"
      }
    ],
    "flags": ""
  },
  {
    "name": "moros",
    "category": "Open Source OS",
    "description": "Hobby operating system written in Rust for x86.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/vinc/moros"
      }
    ],
    "flags": ""
  },
  {
    "name": "mOS",
    "category": "Open Source OS",
    "description": "A hobby operating system developed from scratch",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/MQuy/mos"
      }
    ],
    "flags": ""
  },
  {
    "name": "nopeos",
    "category": "Open Source OS",
    "description": "Simple OS kernel with BASIC interpreter for x86",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/d99kris/nopeos"
      }
    ],
    "flags": ""
  },
  {
    "name": "octox",
    "category": "Open Source OS",
    "description": "Unix-like OS in Rust inspired by xv6-riscv",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/o8vm/octox"
      }
    ],
    "flags": ""
  },
  {
    "name": "oneOS",
    "category": "Open Source OS",
    "description": "x86-32/ARMv7 kernel with pre-emptive multi-threading and window manager",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/nimelehin/oneOS"
      }
    ],
    "flags": ""
  },
  {
    "name": "opuntiaOS",
    "category": "Open Source OS",
    "description": "an operating system targeting x86, ARMv7, Aarch64.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/opuntiaOS-Project/opuntiaOS"
      }
    ],
    "flags": ""
  },
  {
    "name": "orange_slice",
    "category": "Open Source OS",
    "description": "A research kernel/hypervisor for deterministic emulation, in Rust",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/gamozolabs/orange_slice"
      }
    ],
    "flags": ""
  },
  {
    "name": "Ovation",
    "category": "Open Source OS",
    "description": "Simple, hobby, 64-bit OS focused on simplicity and portability. Written in C.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/Garnek0/Ovation"
      }
    ],
    "flags": ""
  },
  {
    "name": "pranaOS",
    "category": "Open Source OS",
    "description": "A unix operating system written from scratch in c/c++",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/pranaOS/pranaOS"
      }
    ],
    "flags": ""
  },
  {
    "name": "r3",
    "category": "Open Source OS",
    "description": "A hobby x86_64 kernel written in Rust with minimal functionalities",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/Narasimha1997/r3"
      }
    ],
    "flags": ""
  },
  {
    "name": "skiftOS",
    "category": "Open Source OS",
    "description": "A simple, handmade OS with a graphical user interface.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/skiftOS/skift"
      }
    ],
    "flags": ""
  },
  {
    "name": "soso",
    "category": "Open Source OS",
    "description": "Simple unix-like OS written in Nasm assembly and mostly C",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/ozkl/soso"
      }
    ],
    "flags": ""
  },
  {
    "name": "tilck",
    "category": "Open Source OS",
    "description": "A Tiny Linux-Compatible Kernel.",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/vvaltchev/tilck"
      }
    ],
    "flags": ""
  },
  {
    "name": "tock",
    "category": "Open Source OS",
    "description": "A secure embedded operating system for microcontrollers",
    "links": [
      {
        "label": "Source",
        "url": "https://www.tockos.org/"
      }
    ],
    "flags": ""
  },
  {
    "name": "unox-os",
    "category": "Open Source OS",
    "description": "Unox is an educational unix-like operating system",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/bistcuite/unox-os"
      }
    ],
    "flags": ""
  },
  {
    "name": "willOS",
    "category": "Open Source OS",
    "description": "A minimal 64 bits kernel",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/willdurand/willOS"
      }
    ],
    "flags": ""
  },
  {
    "name": "Darwin XNU",
    "category": "Popular OS",
    "description": "The XNU kernel source code used in macOS and iOS",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/apple-oss-distributions/xnu"
      }
    ],
    "flags": ""
  },
  {
    "name": "FreeBSD",
    "category": "Popular OS",
    "description": "Unix-like operating system based on the BSD",
    "links": [
      {
        "label": "Source",
        "url": "https://freebsd.org/"
      }
    ],
    "flags": ""
  },
  {
    "name": "FreeDOS",
    "category": "Popular OS",
    "description": "DOS compatible OS",
    "links": [
      {
        "label": "Source",
        "url": "http://freedos.org/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Haiku",
    "category": "Popular OS",
    "description": "BeOS inspired OS",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/haiku/haiku"
      }
    ],
    "flags": ""
  },
  {
    "name": "Linux",
    "category": "Popular OS",
    "description": "Linux kernel",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/torvalds/linux"
      }
    ],
    "flags": ""
  },
  {
    "name": "Minix",
    "category": "Popular OS",
    "description": "Unix-like operating system based on a microkernel architecture",
    "links": [
      {
        "label": "Source",
        "url": "https://www.minix3.org/"
      }
    ],
    "flags": ""
  },
  {
    "name": "MS-DOS",
    "category": "Popular OS",
    "description": "The original sources of MS-DOS 1.25 and 2.0",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/microsoft/MS-DOS"
      }
    ],
    "flags": ""
  },
  {
    "name": "NetBSD",
    "category": "Popular OS",
    "description": "Unix-like operating system based on the BSD",
    "links": [
      {
        "label": "Source",
        "url": "https://www.netbsd.org/"
      }
    ],
    "flags": ""
  },
  {
    "name": "OpenBSD",
    "category": "Popular OS",
    "description": "Unix-like operating system based on the BSD",
    "links": [
      {
        "label": "Source",
        "url": "https://www.openbsd.org/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Plan 9 from Bell Labs",
    "category": "Popular OS",
    "description": "OS from the creators of Unix, network-centric file system and distributed computing.",
    "links": [
      {
        "label": "Source",
        "url": "http://9p.io/plan9/"
      }
    ],
    "flags": ""
  },
  {
    "name": "ReactOS",
    "category": "Popular OS",
    "description": "A free Windows-compatible Operating System",
    "links": [
      {
        "label": "Source",
        "url": "https://reactos.org/"
      }
    ],
    "flags": ""
  },
  {
    "name": "SystemV",
    "category": "Popular OS",
    "description": "AT&T UNIX System V Source Code",
    "links": [
      {
        "label": "Source",
        "url": "https://archive.org/details/ATTUNIXSystemVRelease4Version2"
      }
    ],
    "flags": ""
  },
  {
    "name": "How to Make a Computer Operating System",
    "category": "Dev Resources & Books",
    "description": "Book on OS development in C++",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/SamyPesse/How-to-Make-a-Computer-Operating-System"
      }
    ],
    "flags": ""
  },
  {
    "name": "Intermezzos",
    "category": "Dev Resources & Books",
    "description": "A follow along book to build IntermezzosOS in Rust",
    "links": [
      {
        "label": "Source",
        "url": "https://intermezzos.github.io/book/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Linux Kernel in a Nutshell",
    "category": "Dev Resources & Books",
    "description": "Covers the entire range of kernel tasks",
    "links": [
      {
        "label": "Source",
        "url": "http://www.kroah.com/lkn/"
      }
    ],
    "flags": ""
  },
  {
    "name": "The little book about OS development",
    "category": "Dev Resources & Books",
    "description": "by Erik Helin and Adam Renberg",
    "links": [
      {
        "label": "Source",
        "url": "http://littleosbook.github.io/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Think OS",
    "category": "Dev Resources & Books",
    "description": "A Brief Introduction to Operating Systems by Allen B. Downey",
    "links": [
      {
        "label": "Source",
        "url": "http://greenteapress.com/thinkos/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Operating System Development Series",
    "category": "Dev Resources & Books",
    "description": "OS from the ground up in C",
    "links": [
      {
        "label": "Source",
        "url": "http://www.brokenthorn.com/Resources/OSDevIndex.html"
      }
    ],
    "flags": ""
  },
  {
    "name": "Operating Systems: Three Easy Pieces",
    "category": "Dev Resources & Books",
    "description": "Book covering virtualization, concurrency and persistence",
    "links": [
      {
        "label": "Source",
        "url": "http://pages.cs.wisc.edu/~remzi/OSTEP/"
      }
    ],
    "flags": ""
  },
  {
    "name": "xv6: a simple, Unix-like teaching operating system",
    "category": "Dev Resources & Books",
    "description": "Book for Xv6",
    "links": [
      {
        "label": "Source",
        "url": "https://pdos.csail.mit.edu/6.828/2019/xv6/book-riscv-rev0.pdf"
      }
    ],
    "flags": ""
  },
  {
    "name": "Operating Systems: From 0 to 1",
    "category": "Dev Resources & Books",
    "description": "Bootstrap yourself to write an OS from scratch",
    "links": [
      {
        "label": "Source",
        "url": "https://tuhdo.github.io/os01/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Osdev Notes",
    "category": "Dev Resources & Books",
    "description": "How to write an operating system from scratch",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/dreamos82/Osdev-Notes"
      }
    ],
    "flags": ""
  },
  {
    "name": "Baking Pi – Operating Systems Development",
    "category": "Dev Resources & Books",
    "description": "Tutorial by University of Cambridge",
    "links": [
      {
        "label": "Source",
        "url": "https://www.cl.cam.ac.uk/projects/raspberrypi/tutorials/os/index.html"
      }
    ],
    "flags": ""
  },
  {
    "name": "Build a minimal multi-tasking OS kernel for ARM from scratch",
    "category": "Dev Resources & Books",
    "description": "Tutorial by Jim Huang",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/jserv/mini-arm-os"
      }
    ],
    "flags": ""
  },
  {
    "name": "Bran's Kernel Development",
    "category": "Dev Resources & Books",
    "description": "Tutorial by Brandon Friesen",
    "links": [
      {
        "label": "Source",
        "url": "http://www.osdever.net/bkerndev/Docs/title.htm"
      }
    ],
    "flags": ""
  },
  {
    "name": "os-tutorial - How to create an OS from scratch",
    "category": "Dev Resources & Books",
    "description": "Tutorial by Carlos Fenollosa",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/cfenollosa/os-tutorial"
      }
    ],
    "flags": ""
  },
  {
    "name": "Roll your own toy UNIX-clone OS",
    "category": "Dev Resources & Books",
    "description": "Tutorial by James Molloy",
    "links": [
      {
        "label": "Source",
        "url": "http://jamesmolloy.co.uk/tutorial_html/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Writing an OS in Rust",
    "category": "Dev Resources & Books",
    "description": "Tutorial by Philipp Oppermann",
    "links": [
      {
        "label": "Source",
        "url": "https://os.phil-opp.com/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Making a RISC-V Operating System using Rust",
    "category": "Dev Resources & Books",
    "description": "Tutorial by Stephen Marz",
    "links": [
      {
        "label": "Source",
        "url": "http://osblog.stephenmarz.com/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Kernels 101 – Let's write a Kernel",
    "category": "Dev Resources & Books",
    "description": "Tutorial by Arjun Sreedharan",
    "links": [
      {
        "label": "Source",
        "url": "https://arjunsreedharan.org/post/82710718100/kernels-101-lets-write-a-kernel"
      }
    ],
    "flags": ""
  },
  {
    "name": "Kernels 201 - keyboard and screen support",
    "category": "Dev Resources & Books",
    "description": "Tutorial by Arjun Sreedharan",
    "links": [
      {
        "label": "Source",
        "url": "https://arjunsreedharan.org/post/99370248137/kernels-201-lets-write-a-kernel-with-keyboard"
      }
    ],
    "flags": ""
  },
  {
    "name": "Writing a Tiny x86 Bootloader",
    "category": "Dev Resources & Books",
    "description": "Tutorial by Joe Bergeron",
    "links": [
      {
        "label": "Source",
        "url": "https://www.joe-bergeron.com/posts/Writing%20a%20Tiny%20x86%20Bootloader/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Writing a Bootloader",
    "category": "Dev Resources & Books",
    "description": "Tutorial by Alex Parker",
    "links": [
      {
        "label": "Source",
        "url": "http://3zanders.co.uk/2017/10/13/writing-a-bootloader/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Learning OS dev using Linux kernel and Raspberry Pi",
    "category": "Dev Resources & Books",
    "description": "Tutorial series",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/s-matyukevich/raspberry-pi-os"
      }
    ],
    "flags": ""
  },
  {
    "name": "os-dev",
    "category": "Dev Resources & Books",
    "description": "Wiki with everything you need to know",
    "links": [
      {
        "label": "Source",
        "url": "http://wiki.osdev.org/Main_Page"
      }
    ],
    "flags": ""
  },
  {
    "name": "Rust OSDev",
    "category": "Dev Resources & Books",
    "description": "Newsletter about OS development in Rust",
    "links": [
      {
        "label": "Source",
        "url": "https://rust-osdev.com/"
      }
    ],
    "flags": ""
  },
  {
    "name": "OSRTOS",
    "category": "Dev Resources & Books",
    "description": "List of open source real-time operating systems",
    "links": [
      {
        "label": "Source",
        "url": "https://www.osrtos.com/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Genodians",
    "category": "Dev Resources & Books",
    "description": "Stories around the Genode Operating System",
    "links": [
      {
        "label": "Source",
        "url": "https://genodians.org/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Multicians",
    "category": "Dev Resources & Books",
    "description": "The story of the Multics operating system",
    "links": [
      {
        "label": "Source",
        "url": "https://www.multicians.org/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Write your own Operating System",
    "category": "Dev Resources & Books",
    "description": "Video playlist",
    "links": [
      {
        "label": "Source",
        "url": "https://www.youtube.com/playlist?list=PLHh55M_Kq4OApWScZyPl5HhgsTJS9MZ6M"
      }
    ],
    "flags": ""
  },
  {
    "name": "Nanobyte",
    "category": "Dev Resources & Books",
    "description": "YouTube channel on OS dev",
    "links": [
      {
        "label": "Source",
        "url": "https://www.youtube.com/channel/UCSPIuWADJIMIf9Erf--XAsA"
      }
    ],
    "flags": ""
  },
  {
    "name": "The Linux Kernel documentation",
    "category": "Dev Resources & Books",
    "description": "Official kernel docs",
    "links": [
      {
        "label": "Source",
        "url": "https://www.kernel.org/doc/html/latest/"
      }
    ],
    "flags": ""
  },
  {
    "name": "linux-insides",
    "category": "Dev Resources & Books",
    "description": "Deep dive into the Linux kernel internals",
    "links": [
      {
        "label": "Source",
        "url": "https://0xax.gitbooks.io/linux-insides/content/"
      }
    ],
    "flags": ""
  },
  {
    "name": "windows11",
    "category": "Web Clone – Windows",
    "description": "Experience Windows 11 now within your browser",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/Rajaniraiyn/windows11"
      },
      {
        "label": "Live Demo",
        "url": "https://rajaniraiyn.github.io/windows11"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "windows-11-web",
    "category": "Web Clone – Windows",
    "description": "Windows 11 clone for the web, built with Preact + Vite",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/PiyushSuthar/Windows-11-Web"
      },
      {
        "label": "Live Demo",
        "url": "https://win11.vercel.app"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "windows11 (React)",
    "category": "Web Clone – Windows",
    "description": "Windows 11 rebuilt with React, Redux and Tailwind CSS",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/blueedgetechno/windows11"
      },
      {
        "label": "Live Demo",
        "url": "https://win11.blueedge.me"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "react-windows-ui",
    "category": "Web Clone – Windows",
    "description": "Accessible, reusable React components for Windows Fluent UI",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/virtualvivek/react-windows-ui"
      },
      {
        "label": "Live Demo",
        "url": "https://virtualvivek.github.io/react-windows-ui/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "windows10-framework",
    "category": "Web Clone – Windows",
    "description": "Build native-like Windows 10 web apps with HTML, CSS and JS",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/virtualvivek/Windows10-framework/"
      },
      {
        "label": "Live Demo",
        "url": "https://windows10framework.github.io"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "react-desktop",
    "category": "Web Clone – Windows",
    "description": "React UI components for macOS High Sierra and Windows 10",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/gabrielbull/react-desktop"
      },
      {
        "label": "Live Demo",
        "url": "http://reactdesktop.js.org"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "winXP",
    "category": "Web Clone – Windows",
    "description": "Web based Windows XP desktop recreation, built in React",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/ShizukuIchi/winXP"
      },
      {
        "label": "Live Demo",
        "url": "https://winxp.vercel.app"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "x-webDesktop-vue",
    "category": "Web Clone – Windows",
    "description": "A Windows web-desktop system based on Vue",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/OXOYO/X-WebDesktop-Vue"
      },
      {
        "label": "Live Demo",
        "url": "http://oxoyo.co/X-WebDesktop-Vue/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "jspaint",
    "category": "Web Clone – Windows",
    "description": "Classic MS Paint revived for the browser, plus extras",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/1j01/jspaint"
      },
      {
        "label": "Live Demo",
        "url": "https://jspaint.app/#local:9fdbb2f31c0bb8"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "98",
    "category": "Web Clone – Windows",
    "description": "Web-based Windows 98 desktop recreation",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/1j01/98"
      },
      {
        "label": "Live Demo",
        "url": "https://98.js.org"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "packard-belle-desktop",
    "category": "Web Clone – Windows",
    "description": "Windows-inspired UI built with the packard-belle library and react-rnd",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/padraigfl/packard-belle-desktop"
      },
      {
        "label": "Live Demo",
        "url": "https://packard-belle.netlify.app"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "windows98-html-css-js",
    "category": "Web Clone – Windows",
    "description": "Windows 98 recreated with HTML5, CSS3 and JS",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/lolstring/window98-html-css-js"
      },
      {
        "label": "Live Demo",
        "url": "https://rahul.io/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "windows95",
    "category": "Web Clone – Windows",
    "description": "Windows 95 packaged as an Electron app for macOS, Linux and Windows",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/felixrieseberg/windows95"
      },
      {
        "label": "Live Demo",
        "url": "https://github.com/felixrieseberg/windows95/releases/tag/v2.3.0"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "react95",
    "category": "Web Clone – Windows",
    "description": "Refreshed Windows 95 style UI components for React apps",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/arturbien/React95"
      },
      {
        "label": "Live Demo",
        "url": "https://react95.io/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "webamp",
    "category": "Web Clone – Windows",
    "description": "Winamp 2 reimplemented for the browser",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/captbaritone/webamp"
      },
      {
        "label": "Live Demo",
        "url": "https://webamp.org"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "winampify",
    "category": "Web Clone – Windows",
    "description": "A Spotify web client with an OS-looking Winamp-style interface",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/remigallego/winampify"
      },
      {
        "label": "Live Demo",
        "url": "https://winampify.io"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "webamp-desktop",
    "category": "Web Clone – Windows",
    "description": "Cross-platform desktop version of the Winamp 2.9 reimplementation",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/durasj/webamp-desktop"
      },
      {
        "label": "Live Demo",
        "url": "https://desktop.webamp.org"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "pipes",
    "category": "Web Clone – Windows",
    "description": "Web-based recreation of the classic Windows 3D Pipes screensaver",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/1j01/pipes"
      },
      {
        "label": "Live Demo",
        "url": "https://1j01.github.io/pipes/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "3D-FlowerBox",
    "category": "Web Clone – Windows",
    "description": "WebGL remake of the classic Windows 95 screensaver",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/kevin-shannon/3D-FlowerBox"
      },
      {
        "label": "Live Demo",
        "url": "https://kevinshannon.dev/3D-FlowerBox/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "zine (winmine)",
    "category": "Web Clone – Windows",
    "description": "A faithful in-browser recreation of Windows 95, starting from Minesweeper",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/STRd6/zine"
      },
      {
        "label": "Live Demo",
        "url": "https://winmine-exe.vercel.app"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "win95-media-player",
    "category": "Web Clone – Windows",
    "description": "The Windows 95 media player, running in your browser",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/benwiley4000/win95-media-player"
      },
      {
        "label": "Live Demo",
        "url": "https://benwiley4000.github.io/win95-media-player/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "js-solitaire",
    "category": "Web Clone – Windows",
    "description": "Classic clone of Microsoft's Solitaire game",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/rjanjic/js-solitaire"
      },
      {
        "label": "Live Demo",
        "url": "http://radovanjanjic.com/js-solitaire/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "ArmorAlley",
    "category": "Web Clone – Windows",
    "description": "Browser-based interpretation of the MS-DOS release of Armor Alley",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/scottschiller/ArmorAlley/"
      },
      {
        "label": "Live Demo",
        "url": "http://www.schillmania.com/armor-alley/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "winclassic",
    "category": "Web Clone – Windows",
    "description": "Utility that eases development of Windows Classic themes",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/tpenguinltg/winclassic"
      },
      {
        "label": "Live Demo",
        "url": "https://tpenguinltg.github.io/winclassic/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "fileExplorer",
    "category": "Web Clone – Windows",
    "description": "Zero-dependency JS widget for navigating and managing files",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/cubiclesoft/js-fileexplorer"
      },
      {
        "label": "Live Demo",
        "url": "https://cubiclesoft.com/demos/js-fileexplorer/demo.html"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "clippy.js",
    "category": "Web Clone – Windows",
    "description": "Add Clippy or friends to any website for instant nostalgia",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/smore-inc/clippy.js"
      },
      {
        "label": "Live Demo",
        "url": "https://www.smore.com/clippy-js"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "wolf3d",
    "category": "Web Clone – Windows",
    "description": "The classic Windows game Wolfenstein 3D, in the browser",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/jseidelin/wolf3d"
      },
      {
        "label": "Live Demo",
        "url": "http://git.nihilogic.dk/wolf3d/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "skifree.js",
    "category": "Web Clone – Windows",
    "description": "The classic PC game SkiFree, rebuilt in JS",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/basicallydan/skifree.js"
      },
      {
        "label": "Live Demo",
        "url": "https://basicallydan.github.io/skifree.js/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "vipercard",
    "category": "Web Clone – Windows",
    "description": "Open source rewrite of 1987's HyperCard",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/moltenform/vipercard"
      },
      {
        "label": "Live Demo",
        "url": "https://www.vipercard.net"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "7.css",
    "category": "Web Clone – Windows",
    "description": "Tiny CSS framework for faithful Windows 7 UI recreations",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/khang-nd/7.css"
      },
      {
        "label": "Live Demo",
        "url": "https://khang-nd.github.io/win7/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "XP.css",
    "category": "Web Clone – Windows",
    "description": "CSS framework for building faithful OS GUI recreations",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/botoxparty/XP.css"
      },
      {
        "label": "Live Demo",
        "url": "https://botoxparty.github.io/XP.css/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "98.css",
    "category": "Web Clone – Windows",
    "description": "A design system for building faithful recreations of old UIs",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/jdan/98.css"
      },
      {
        "label": "Live Demo",
        "url": "https://jdan.github.io/98.css/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "BOOTSTRA.386",
    "category": "Web Clone – Windows",
    "description": "Vintage 1980s DOS-inspired Twitter Bootstrap theme",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/kristopolous/BOOTSTRA.386"
      },
      {
        "label": "Live Demo",
        "url": "http://kristopolous.github.io/BOOTSTRA.386/demo.html"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "os-gui",
    "category": "Web Clone – Windows",
    "description": "Retro Operating System GUI JS library",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/1j01/os-gui"
      },
      {
        "label": "Live Demo",
        "url": "https://1j01.github.io/os-gui/demo/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "vue-window",
    "category": "Web Clone – Windows",
    "description": "Vue component implementing a PC-style window UI",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/michitaro/vue-window"
      },
      {
        "label": "Live Demo",
        "url": "https://michitaro.github.io/vue-window/?Sample31"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "fake-ie",
    "category": "Web Clone – Windows",
    "description": "Simulate an old version of Internet Explorer on iOS",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/partiellkorrekt/fake-ie"
      },
      {
        "label": "Live Demo",
        "url": "https://theoldnet.com"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "bubbles",
    "category": "Web Clone – Windows",
    "description": "A recreation of the Windows Bubbles screensaver",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/khang-nd/bubbles"
      },
      {
        "label": "Live Demo",
        "url": "https://khang-nd.github.io/bubbles/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "Chicago95",
    "category": "Web Clone – Windows",
    "description": "1995-Microsoft-style theme for Linux desktops",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/grassmunk/Chicago95"
      },
      {
        "label": "Live Demo",
        "url": "https://github.com/grassmunk/Chicago95/releases"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "ui95",
    "category": "Web Clone – Windows",
    "description": "Preact implementation of Windows 95/98/ME style components",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/AshKyd/ui95"
      },
      {
        "label": "Live Demo",
        "url": "https://ash.ms"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "afterstep",
    "category": "Web Clone – Windows",
    "description": "X Window System manager based on the NeXTStep look and feel",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/afterstep/afterstep/"
      },
      {
        "label": "Live Demo",
        "url": "http://www.afterstep.org/index.php"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "wmaker",
    "category": "Web Clone – Windows",
    "description": "X11 window manager modeled on the GNUstep Desktop Environment",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/window-maker/wmaker"
      },
      {
        "label": "Live Demo",
        "url": "http://www.windowmaker.org"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "The Indie Web",
    "category": "Web Clone – Windows",
    "description": "A Windows GUI inspired blogging site",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/tholman/the-indie-web"
      },
      {
        "label": "Live Demo",
        "url": "https://theindieweb.com"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "90's Cursor Effects",
    "category": "Web Clone – Windows",
    "description": "Nostalgic 90s-style mouse cursor trail effects",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/tholman/cursor-effects"
      },
      {
        "label": "Live Demo",
        "url": "https://tholman.com/cursor-effects/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "Vuindows",
    "category": "Web Clone – Windows",
    "description": "A tribute to Windows 10 made with Vue.js",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/marcmascarell/Vuindows"
      },
      {
        "label": "Live Demo",
        "url": "https://marcmascarell.github.io/Vuindows/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "dinhquangtrung.net",
    "category": "Web Clone – Windows",
    "description": "An \"Online Windows 7\" you can use anywhere",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/trungdq88/dinhquangtrung.net"
      },
      {
        "label": "Live Demo",
        "url": "https://dinhquangtrung.net/windows7/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "windows7 (khang-nd)",
    "category": "Web Clone – Windows",
    "description": "Windows 7 UI and functionality simulation for desktop and mobile",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/khang-nd/windows7"
      },
      {
        "label": "Live Demo",
        "url": "https://khang-nd.github.io/windows7/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "expensive.toys",
    "category": "Web Clone – Windows",
    "description": "A quirky personal site built with the React95 component library",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/arturbien/React95"
      },
      {
        "label": "Live Demo",
        "url": "https://www.expensive.toys"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "macOS-web",
    "category": "Web Clone – macOS",
    "description": "Replicates the macOS Monterey desktop experience on the web, using Svelte",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/PuruVJ/macos-web"
      },
      {
        "label": "Live Demo",
        "url": "https://macos.vercel.app"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "macOS-preact",
    "category": "Web Clone – macOS",
    "description": "Legacy macOS Monterey desktop experience built with Preact",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/puruvj/macos-preact"
      },
      {
        "label": "Live Demo",
        "url": "https://macos-preact.vercel.app"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "playground-macOS",
    "category": "Web Clone – macOS",
    "description": "Portfolio site simulating macOS's GUI with React and Tailwind CSS",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/Renovamen/playground-macos"
      },
      {
        "label": "Live Demo",
        "url": "https://portfolio.zxh.io"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "giantSur",
    "category": "Web Clone – macOS",
    "description": "macOS Big Sur UI clone built with React, Next.js and Tailwind CSS",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/soroushchehresa/giant-sur"
      },
      {
        "label": "Live Demo",
        "url": "https://giantsur.netlify.app"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "finder-clone",
    "category": "Web Clone – macOS",
    "description": "A bare-bones clone of the macOS Finder app, built with React and Sass",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/guyariely/finder-clone"
      },
      {
        "label": "Live Demo",
        "url": "https://finder-clone.netlify.app"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "pce",
    "category": "Web Clone – macOS",
    "description": "Emulates Mac Plus, IBM PC and Atari ST in the browser via WebAssembly",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/jsdf/pce"
      },
      {
        "label": "Live Demo",
        "url": "http://jamesfriend.com.au/pce-js/pce-js-apps/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "Joeyonng's backyard",
    "category": "Web Clone – macOS",
    "description": "Personal website built to mimic the macOS Big Sur desktop",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/Joeyonng/joeyonng-backyard"
      },
      {
        "label": "Live Demo",
        "url": "https://joeyonng.github.io"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "Ubuntu 20.04 portfolio",
    "category": "Web Clone – Linux",
    "description": "Personal portfolio themed as Ubuntu 20.04, built with React and Tailwind CSS",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/vivek9patel/vivek9patel.github.io"
      },
      {
        "label": "Live Demo",
        "url": "https://vivek9patel.github.io"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "linuxWeb",
    "category": "Web Clone – Linux",
    "description": "A simulated Linux environment inside your browser",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/Manthee1/linuxWeb"
      },
      {
        "label": "Live Demo",
        "url": "https://manthee1.github.io/linuxWeb/dist/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "GoodManWEN",
    "category": "Web Clone – Linux",
    "description": "Website simulating a Linux system's GUI, themed on the Deepin distro",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/GoodManWEN/GoodManWEN.github.io"
      },
      {
        "label": "Live Demo",
        "url": "https://goodmanwen.github.io/#/login"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "os.directory",
    "category": "Web Clone – Linux",
    "description": "Linux-like operating system running inside a web browser",
    "links": [
      {
        "label": "Source",
        "url": "https://os.directory"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "zine (DIY OS)",
    "category": "Indie Web OS",
    "description": "DIY E-Zine and Operating System",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/STRd6/zine"
      },
      {
        "label": "Live Demo",
        "url": "https://whimsy.space"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "OS.js",
    "category": "Indie Web OS",
    "description": "Open-source web desktop platform with window manager, APIs and GUI toolkit",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/os-js/OS.js"
      },
      {
        "label": "Live Demo",
        "url": "https://demo.os-js.org"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "FriendUP",
    "category": "Indie Web OS",
    "description": "Internet Operating System for any POSIX-compatible host",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/FriendUPCloud"
      },
      {
        "label": "Live Demo",
        "url": "https://friendsky.cloud/webclient/index.html"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "AaronOS",
    "category": "Indie Web OS",
    "description": "Public repo of a personal indie web OS, open to contributions",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/MineAndCraft12/AaronOS"
      },
      {
        "label": "Live Demo",
        "url": "https://aaronos.dev/AaronOS/aosBeta.php"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "web-Desktop-environment",
    "category": "Indie Web OS",
    "description": "A web-based cross-platform desktop environment",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/shmuelhizmi/web-desktop-environment"
      },
      {
        "label": "Live Demo",
        "url": "http://http.web-desktop.run"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "jQuery-Desktop",
    "category": "Indie Web OS",
    "description": "JavaScript desktop environment built with jQuery and HTML5",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/nathansmith/jQuery-Desktop"
      },
      {
        "label": "Live Demo",
        "url": "https://desktop.sonspring.com"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "serenity (web)",
    "category": "Indie Web OS",
    "description": "A love letter to 90s UIs with a custom Unix-like core",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/SerenityOS/serenity"
      },
      {
        "label": "Live Demo",
        "url": "https://serenityos.org"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "KodExplorer",
    "category": "Indie Web OS",
    "description": "Web-based file manager and browser IDE / code editor",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/kalcaddle/KodExplorer"
      },
      {
        "label": "Live Demo",
        "url": "http://demo.kodcloud.com/#desktop"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "The Poolsuite",
    "category": "Indie Web OS",
    "description": "FM radio, mixtapes and vacation vibes in an indie web-desktop format",
    "links": [
      {
        "label": "Source",
        "url": "https://poolsuite.net"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "itisasifyouweredoingwork",
    "category": "Indie Web OS",
    "description": "Play \"It is as if you were doing work\" inside your browser",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/pippinbarr/itisasifyouweredoingwork"
      },
      {
        "label": "Live Demo",
        "url": "https://pippinbarr.github.io/itisasifyouweredoingwork/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "jurassicsystems.com",
    "category": "Indie Web OS",
    "description": "HTML5/JS recreation of the Jurassic Park movie computer system",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/tojrobinson/jurassicsystems.com"
      },
      {
        "label": "Live Demo",
        "url": "https://jurassicsystems.com"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "CloudDesk",
    "category": "Indie Web OS",
    "description": "Online desktop for multi-tasking with a modern Google-style UI",
    "links": [
      {
        "label": "Source",
        "url": "http://altaica.altervista.org"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "fos",
    "category": "Indie Web OS",
    "description": "Web components that turn a web app into a fake operating system",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/victorqribeiro/fos"
      },
      {
        "label": "Live Demo",
        "url": "https://victorribeiro.com"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "W_Dev desktop",
    "category": "Indie Web OS",
    "description": "A desktop-style personal site inspired by Ubuntu 12.04/18.04 and Ubuntu Touch",
    "links": [
      {
        "label": "Source",
        "url": "https://gitlab.com/WuerfelDev"
      },
      {
        "label": "Live Demo",
        "url": "https://wuerfeldev.de/desktop"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "my-second-pc",
    "category": "Indie Web OS",
    "description": "A vanilla-JS desktop environment emulation, originally built in 2006",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/koas/my-second-pc"
      },
      {
        "label": "Live Demo",
        "url": "https://koas.dev/m2pc/dinamicos/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "daedalOS",
    "category": "Indie Web OS",
    "description": "Full desktop environment in the browser, built with TypeScript",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/DustinBrett/daedalOS"
      },
      {
        "label": "Live Demo",
        "url": "https://dustinbrett.com"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "github95",
    "category": "Indie Web OS",
    "description": "Your GitHub profile, restyled as Windows 95, built with React",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/edwardpayton/github95"
      },
      {
        "label": "Live Demo",
        "url": "https://github95.vercel.app"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "Fizzygum",
    "category": "Indie Web OS",
    "description": "A web framework and platform designed to put an entire OS at your fingertips",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/davidedc/Fizzygum"
      },
      {
        "label": "Live Demo",
        "url": "http://fizzygum.org/sandboxes/latest-stable/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "Puter",
    "category": "Indie Web OS",
    "description": "Web-based cloud operating system for storing and editing files anywhere",
    "links": [
      {
        "label": "Source",
        "url": "https://puter.com/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "Pluto",
    "category": "Indie Web OS",
    "description": "A minimal but functional web OS with a desktop-like experience",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/zeondev/pluto"
      },
      {
        "label": "Live Demo",
        "url": "https://pluto.zeon.dev"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "Timothy Howard resume",
    "category": "Portfolio / Personal OS",
    "description": "An indie OS-styled resume/portfolio site",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/timhow38/Resume-WebApplication"
      },
      {
        "label": "Live Demo",
        "url": "https://coreos.io"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "Heather Vandervecht",
    "category": "Portfolio / Personal OS",
    "description": "Windows 95-esque desktop portfolio site with a chat app as the highlight",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/heathervv/portfolio-chatbot"
      },
      {
        "label": "Live Demo",
        "url": "https://heathervv.com"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "Jack Adam",
    "category": "Portfolio / Personal OS",
    "description": "Portfolio site recreating an old computer interface",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/jckdm/jckdm.github.io"
      },
      {
        "label": "Live Demo",
        "url": "https://jackadam.cc"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "Derya Antonelli",
    "category": "Portfolio / Personal OS",
    "description": "Retro-inspired personal OS with client-side applications",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/D-Antonelli/portfolio"
      },
      {
        "label": "Live Demo",
        "url": "https://www.deryasdesktop.com"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "Gustavo Chico",
    "category": "Portfolio / Personal OS",
    "description": "An indie OS format personal website",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/JGustavoChico"
      },
      {
        "label": "Live Demo",
        "url": "https://gustavochico.com/desktop/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "Patrick Kage",
    "category": "Portfolio / Personal OS",
    "description": "Windows 98 inspired portfolio website",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/pkage/pkage.github.io"
      },
      {
        "label": "Live Demo",
        "url": "https://ka.ge"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "melkael.github.io",
    "category": "Portfolio / Personal OS",
    "description": "A Windows 7 based resume site",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/melkael/melkael.github.io"
      },
      {
        "label": "Live Demo",
        "url": "https://elkael.com"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "websiterevision2017",
    "category": "Portfolio / Personal OS",
    "description": "A detailed personal/professional website revision",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/paultopia/websiterevision2017"
      },
      {
        "label": "Live Demo",
        "url": "https://gowder.io"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "homepage (v-y-l)",
    "category": "Portfolio / Personal OS",
    "description": "A personal website built with TypeScript",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/v-y-l/Homepage"
      },
      {
        "label": "Live Demo",
        "url": "https://www.vyl.app"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "syxanash.github.io",
    "category": "Portfolio / Personal OS",
    "description": "A Windows-retro styled personal website",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/syxanash/syxanash.github.io"
      },
      {
        "label": "Live Demo",
        "url": "https://simone.computer/#/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "windows7 (khang-nd portfolio)",
    "category": "Portfolio / Personal OS",
    "description": "Windows 7 simulation supporting desktop and mobile devices",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/khang-nd/windows7"
      },
      {
        "label": "Live Demo",
        "url": "https://khang-nd.github.io/windows7/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "Tholman",
    "category": "Portfolio / Personal OS",
    "description": "A collection of Tim Holman's creative coding projects",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/tholman/tholman"
      },
      {
        "label": "Live Demo",
        "url": "https://tholman.com"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "Hannah Blair",
    "category": "Portfolio / Personal OS",
    "description": "A Windows 95 inspired portfolio website",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/hannahblair"
      },
      {
        "label": "Live Demo",
        "url": "https://hannahblair.co.uk"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "LevyTerminal",
    "category": "Portfolio / Personal OS",
    "description": "A terminal-style portfolio website",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/dodio12138/MeTerminal"
      },
      {
        "label": "Live Demo",
        "url": "https://dodio12138.github.io/MeTerminal/src/index.html"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "commodore-64-desktop",
    "category": "Retro & Vintage Web",
    "description": "A desktop tribute to the Commodore 64, one of the earliest operating systems",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/ssshake/commodore-64-desktop"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "microweb",
    "category": "Retro & Vintage Web",
    "description": "A DOS web browser built for 8088-class machines",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/jhhoward/MicroWeb"
      },
      {
        "label": "Live Demo",
        "url": "https://github.com/jhhoward/MicroWeb/releases"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "old internet (theoldnet)",
    "category": "Retro & Vintage Web",
    "description": "Restores vintage web browsing on vintage computers via the Wayback Machine",
    "links": [
      {
        "label": "Source",
        "url": "https://theoldnet.com"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "nextsite",
    "category": "Retro & Vintage Web",
    "description": "Simple HTML/CSS site mimicking key NeXT OS Workspace elements",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/juddy/nextsite"
      },
      {
        "label": "Live Demo",
        "url": "https://prik-k.github.io/nextsite/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "WorldWideWeb (NeXT)",
    "category": "Retro & Vintage Web",
    "description": "The first version of the NeXTStep WorldWideWeb application with libWWW",
    "links": [
      {
        "label": "Source",
        "url": "https://worldwideweb.cern.ch/browser/"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "awesome-web-desktops",
    "category": "Retro & Vintage Web",
    "description": "A curated list of websites and apps that look like desktop GUIs",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/syxanash/awesome-web-desktops"
      },
      {
        "label": "Live Demo",
        "url": "https://simone.computer/#/webdesktops"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "retro-computing-internet-resources",
    "category": "Retro & Vintage Web",
    "description": "A list of projects for getting vintage computers online",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/ssshake/retro-computing-internet-resources"
      }
    ],
    "flags": "🌐"
  },
  {
    "name": "awesome-UNIX",
    "category": "Retro & Vintage Web",
    "description": "Curated list of UNIX and UNIX-like resources: Linux, BSD, macOS, Illumos, 9front",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/sirredbeard/Awesome-UNIX"
      }
    ],
    "flags": "🌐"
  }
];

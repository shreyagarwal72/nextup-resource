export interface TvApp {
  name: string;
  category: string;
  description: string;
  links: { label: string; url: string }[];
  flags: string;
}

export const tvApps: TvApp[] = [
  {
    "name": "Arc Launcher",
    "category": "Launcher",
    "description": "A minimal, open-source Android TV launcher featuring WiFi data usage widget, an inbuilt OLED friendly screensaver, and improved UX",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/meddouribadis/arclauncher"
      }
    ],
    "flags": ""
  },
  {
    "name": "FLauncher (fork)",
    "category": "Launcher",
    "description": "Alternative launcher for Android TV",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/osrosal/flauncher"
      }
    ],
    "flags": ""
  },
  {
    "name": "FLauncher",
    "category": "Launcher",
    "description": "Alternative launcher for Android TV",
    "links": [
      {
        "label": "Source",
        "url": "https://gitlab.com/flauncher/flauncher"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=me.efesser.flauncher"
      }
    ],
    "flags": ""
  },
  {
    "name": "LTvLauncher",
    "category": "Launcher",
    "description": "A minimal, open-source Android TV launcher featuring WiFi data usage widget, an inbuilt OLED friendly screensaver, and improved UX",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/LeanBitLab/LtvLauncher"
      }
    ],
    "flags": ""
  },
  {
    "name": "LeanbackLauncher",
    "category": "Launcher",
    "description": "Google Leanback Launcher on steroids",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/tsynik/LeanbackLauncher"
      }
    ],
    "flags": ""
  },
  {
    "name": "LeanKeyKeyboard",
    "category": "Keyboard",
    "description": "Keyboard for Android-based set-top boxes and TV",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/yuliskov/LeanKeyKeyboard"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=org.liskovsoft.androidtv.rukeyboard"
      }
    ],
    "flags": ""
  },
  {
    "name": "Aurora Store",
    "category": "App Store",
    "description": "An alternate to Google's Play Store",
    "links": [
      {
        "label": "Source",
        "url": "https://gitlab.com/AuroraOSS/AuroraStore"
      },
      {
        "label": "Website",
        "url": "https://auroraoss.com/"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/en/packages/com.aurora.store/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Droid-ify",
    "category": "App Store",
    "description": "A quick material F-Droid client",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/Droid-ify/client"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/en/packages/com.looker.droidify/"
      }
    ],
    "flags": ""
  },
  {
    "name": "F-Droid Classic",
    "category": "App Store",
    "description": "F-Droid client with the classic UI",
    "links": [
      {
        "label": "Source",
        "url": "https://git.bubu1.eu/Bubu/fdroidclassic"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/en/packages/eu.bubu1.fdroidclassic/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Flicky",
    "category": "App Store",
    "description": "An FDroid client with a TV friendly UI",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/mlm-games/flicky"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/en/packages/app.flicky/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Neo Store",
    "category": "App Store",
    "description": "The modern and feature-rich F-Droid client for everyone!",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/NeoApplications/Neo-Store"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/packages/com.machiav3lli.fdroid"
      }
    ],
    "flags": ""
  },
  {
    "name": "DTVfree",
    "category": "Web Browser",
    "description": "Simple, fast and lightweight Web browser for Android TV",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/InukaAsith/DTVfree"
      }
    ],
    "flags": ""
  },
  {
    "name": "TV Bro",
    "category": "Web Browser",
    "description": "Simple web browser optimized to use with TV remote",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/truefedex/tv-bro"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=com.phlox.tvwebbrowser"
      }
    ],
    "flags": ""
  },
  {
    "name": "Fermata",
    "category": "Media Player",
    "description": "a free, open source audio, video and TV player with a simple and intuitive interface",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/AndreyPavlenko/Fermata"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=me.aap.fermata"
      }
    ],
    "flags": ""
  },
  {
    "name": "Ghosten Player",
    "category": "Media Player",
    "description": "A video player for local or hosted Jellyfin/Emby servers",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/GhostenEditor/Ghosten-Player"
      }
    ],
    "flags": ""
  },
  {
    "name": "Just (Video) Player",
    "category": "Media Player",
    "description": "Simple video player based on ExoPlayer library",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/moneytoo/Player"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/packages/com.brouken.player/"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=com.brouken.player"
      }
    ],
    "flags": ""
  },
  {
    "name": "Kodi",
    "category": "Media Player",
    "description": "An award-winning free and open source software media player and entertainment hub for digital media",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/xbmc/xbmc"
      },
      {
        "label": "Website",
        "url": "https://kodi.tv/"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/en/packages/org.xbmc.kodi/"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=org.xbmc.kodi"
      }
    ],
    "flags": ""
  },
  {
    "name": "MPV",
    "category": "Media Player",
    "description": "A free and open source cross-platform media player and video player",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/mpv-android/mpv-android"
      },
      {
        "label": "Website",
        "url": "https://mpv.io/"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/packages/is.xyz.mpv"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=is.xyz.mpv"
      }
    ],
    "flags": ""
  },
  {
    "name": "Nova Player",
    "category": "Media Player",
    "description": "Video player for local/network content with subtitle/metadata download support",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/nova-video-player/aos-AVP"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/packages/org.courville.nova"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=org.courville.nova"
      }
    ],
    "flags": ""
  },
  {
    "name": "VLC",
    "category": "Media Player",
    "description": "A free and open source cross-platform multimedia player",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/videolan/vlc-android"
      },
      {
        "label": "Website",
        "url": "https://www.videolan.org"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/en/packages/org.videolan.vlc/"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=org.videolan.vlc"
      }
    ],
    "flags": ""
  },
  {
    "name": "Clipious",
    "category": "Streaming - YouTube",
    "description": "Client for Invidious, the privacy focused YouTube front end",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/lamarios/clipious"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/packages/com.github.lamarios.clipious/"
      }
    ],
    "flags": ""
  },
  {
    "name": "NewPipe",
    "category": "Streaming - YouTube",
    "description": "Lightweight YouTube frontend",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/TeamNewPipe/NewPipe"
      },
      {
        "label": "Website",
        "url": "https://newpipe.net/"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/packages/org.schabi.newpipe/"
      }
    ],
    "flags": ""
  },
  {
    "name": "SmartTube",
    "category": "Streaming - YouTube",
    "description": "An advanced (YouTube) player for Android TVs and TV boxes",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/yuliskov/smarttube"
      },
      {
        "label": "Website",
        "url": "https://smarttubeapp.github.io/"
      }
    ],
    "flags": ""
  },
  {
    "name": "TizenTube Cobalt",
    "category": "Streaming - YouTube",
    "description": "Experience TizenTube on other devices that are not Tizen",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/reisxd/TizenTubeCobalt"
      }
    ],
    "flags": ""
  },
  {
    "name": "Tubular",
    "category": "Streaming - YouTube",
    "description": "A fork of NewPipe that implements SponsorBlock and ReturnYouTubeDislike",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/polymorphicshade/Tubular"
      },
      {
        "label": "IzzyOnDroid",
        "url": "https://apt.izzysoft.de/fdroid/index/apk/org.polymorphicshade.tubular"
      }
    ],
    "flags": ""
  },
  {
    "name": "ARVIO",
    "category": "Streaming - Movies/TV/Anime",
    "description": "A media hub application for Android TV with a modern, beautiful interface",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/ProdigyV21/ARVIO"
      },
      {
        "label": "Website",
        "url": "https://arvio.tv/"
      },
      {
        "label": "GooglePlay",
        "url": "https://play.google.com/store/apps/details?id=com.arvio.tv"
      }
    ],
    "flags": ""
  },
  {
    "name": "CloudStream",
    "category": "Streaming - Movies/TV/Anime",
    "description": "App for streaming and downloading media",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/recloudstream/cloudstream"
      },
      {
        "label": "IzzyOnDroid",
        "url": "https://apt.izzysoft.de/fdroid/index/apk/com.lagradost.cloudstream3"
      }
    ],
    "flags": ""
  },
  {
    "name": "Digilog TV",
    "category": "Streaming - Movies/TV/Anime",
    "description": "A free and open-source TV news app",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/aldrinzigmundv/digilogtv"
      },
      {
        "label": "IzzyOnDroid",
        "url": "https://apt.izzysoft.de/packages/io.github.aldrinzigmundv.digilogtv/"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=io.github.aldrinzigmundv.digilogtv"
      }
    ],
    "flags": ""
  },
  {
    "name": "Flixclusive",
    "category": "Streaming - Movies/TV/Anime",
    "description": "A modern streaming service app that provides users with a convenient way to play and watch the latest movies and TV shows available on the internet",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/rhenwinch/Flixclusive"
      }
    ],
    "flags": ""
  },
  {
    "name": "Lumera",
    "category": "Streaming - Movies/TV/Anime",
    "description": "Browse, discover, and stream content from Stremio-compatible addons. Connect your Stremio account to instantly import your existing addon collection",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/LumeraD3v/Lumera"
      }
    ],
    "flags": ""
  },
  {
    "name": "NuvioTV",
    "category": "Streaming - Movies/TV/Anime",
    "description": "A modern Android TV media player powered by the Stremio addon ecosystem",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/tapframe/NuvioTV"
      }
    ],
    "flags": ""
  },
  {
    "name": "Streamflix Reborn",
    "category": "Streaming - Movies/TV/Anime",
    "description": "An Android TV app to stream movies and TV shows for free",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/streamflix-reborn/streamflix"
      }
    ],
    "flags": ""
  },
  {
    "name": "Stremio",
    "category": "Streaming - Movies/TV/Anime",
    "description": "A video streaming application, that allows you to watch and organize video content from different services",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/Stremio"
      },
      {
        "label": "Website",
        "url": "https://www.stremio.com/"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=com.stremio.one"
      }
    ],
    "flags": ""
  },
  {
    "name": "Jellyfin 3rd Party Clients",
    "category": "Streaming - Self-hosted",
    "description": "[Awesome Jellyfin](https://github.com/awesome-jellyfin/awesome-jellyfin/blob/main/CLIENTS.md#android-tv)",
    "links": [],
    "flags": ""
  },
  {
    "name": "DSub",
    "category": "Streaming - Self-hosted",
    "description": "Connect to your Subsonic server and listen to your music wherever you go",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/daneren2005/Subsonic"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/en/packages/github.daneren2005.dsub"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=github.daneren2005.dsub"
      }
    ],
    "flags": ""
  },
  {
    "name": "Jellyfin",
    "category": "Streaming - Self-hosted",
    "description": "A Free Software Media System that puts you in control of managing and streaming your media",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/jellyfin/jellyfin-androidtv"
      },
      {
        "label": "Website",
        "url": "https://jellyfin.org/"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/en/packages/org.jellyfin.androidtv/"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=org.jellyfin.androidtv"
      }
    ],
    "flags": ""
  },
  {
    "name": "SmartTwitchTV",
    "category": "Streaming - Twitch",
    "description": "A Twitch web client that works on Android TVs",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/fgl27/SmartTwitchTV"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=com.fgl27.twitch"
      }
    ],
    "flags": ""
  },
  {
    "name": "Artemis",
    "category": "Streaming - Other",
    "description": "An open source client for Apollo/Sunshine",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/ClassicOldSong/moonlight-android"
      }
    ],
    "flags": ""
  },
  {
    "name": "FCast",
    "category": "Streaming - Other",
    "description": "An open-source protocol designed to open wireless audio and video streaming to everybody",
    "links": [
      {
        "label": "Source",
        "url": "https://gitlab.futo.org/videostreaming/fcast"
      },
      {
        "label": "Website",
        "url": "https://fcast.org/"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=com.futo.fcast.receiver.playstore"
      }
    ],
    "flags": ""
  },
  {
    "name": "M3U",
    "category": "Streaming - Other",
    "description": "Stream media player on Android devices",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/realOxy/M3UAndroid"
      },
      {
        "label": "F-Droid",
        "url": "https://apt.izzysoft.de/fdroid/index/apk/com.lagradost.cloudstream3"
      }
    ],
    "flags": ""
  },
  {
    "name": "Moonlight",
    "category": "Streaming - Other",
    "description": "Play games from your PC on Android",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/moonlight-stream/moonlight-android"
      },
      {
        "label": "Website",
        "url": "https://moonlight-stream.org/"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/packages/com.limelight/"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=com.limelight"
      }
    ],
    "flags": ""
  },
  {
    "name": "Amaze",
    "category": "File Browser",
    "description": "Simple and attractive Material Design file manager for Android",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/TeamAmaze/AmazeFileManager"
      },
      {
        "label": "Website",
        "url": "https://teamamaze.xyz/"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/packages/com.amaze.filemanager/"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=com.amaze.filemanager"
      }
    ],
    "flags": ""
  },
  {
    "name": "FireFiles",
    "category": "File Browser",
    "description": "FireFiles is based on AnExplorer. It is a light-weight but powerful file manager for everything that runs on Android OS",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/gigabytedevelopers/FireFiles/issues"
      },
      {
        "label": "IzzyOnDroid",
        "url": "https://apt.izzysoft.de/fdroid/index/apk/com.gigabytedevelopersinc.app.explorer"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=com.gigabytedevelopersinc.app.explorer"
      }
    ],
    "flags": "[[Google Play](https://play.google.com/store/apps/details?id=com.gigabytedevelopersinc.app.explorer)] 🛑"
  },
  {
    "name": "Fluffy",
    "category": "File Browser",
    "description": "A fast, modern file manager with powerful archive support and an Android TV–friendly UI",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/mlm-games/Fluffy"
      },
      {
        "label": "IzzyOnDroid",
        "url": "https://apt.izzysoft.de/fdroid/index/apk/app.fluffy"
      }
    ],
    "flags": ""
  },
  {
    "name": "Ghost Commander",
    "category": "File Browser",
    "description": "Dual-panel file manager",
    "links": [
      {
        "label": "Source",
        "url": "https://sourceforge.net/p/ghostcommander"
      },
      {
        "label": "Website",
        "url": "https://sites.google.com/site/ghostcommander1"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/en/packages/com.ghostsq.commander"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=com.ghostsq.commander"
      }
    ],
    "flags": ""
  },
  {
    "name": "Material Files",
    "category": "File Browser",
    "description": "Material Design file manager for Android",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/zhanghai/MaterialFiles"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/packages/me.zhanghai.android.files"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=me.zhanghai.android.files"
      }
    ],
    "flags": ""
  },
  {
    "name": "OI File Manager",
    "category": "File Browser",
    "description": "OI File Manager",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/openintents/filemanager"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/en/packages/org.openintents.filemanager/"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=org.openintents.filemanager"
      }
    ],
    "flags": ""
  },
  {
    "name": "BiglyBT",
    "category": "Download Manager",
    "description": "Fully featured open source bittorrent client and remote control",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/BiglySoftware/BiglyBT-Android"
      },
      {
        "label": "Website",
        "url": "https://www.biglybt.com/"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/packages/com.biglybt.android.client/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Debrify",
    "category": "Download Manager",
    "description": "Cross-platform debrid manager for Real-Debrid, Torbox, and PikPak with streaming and download support",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/varunsalian/debrify"
      },
      {
        "label": "Website",
        "url": "https://varunsalian.github.io/debrify/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Download Navi",
    "category": "Download Manager",
    "description": "A free and Open Source download manager",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/TachibanaGeneralLaboratories/download-navi"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/en/packages/com.tachibana.downloader/"
      },
      {
        "label": "Google play",
        "url": "https://play.google.com/store/apps/details?id=com.tachibana.downloader"
      }
    ],
    "flags": ""
  },
  {
    "name": "TorrServe",
    "category": "Download Manager",
    "description": "Application for downloading torrents as HTTP files. Torrent connection is done localy",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/YouROK/TorrServe"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/packages/ru.yourok.torrserve/"
      }
    ],
    "flags": ""
  },
  {
    "name": "BT Remote",
    "category": "Connectivity",
    "description": "An Android app that turns your smartphone into a Bluetooth remote for Android TV",
    "links": [
      {
        "label": "Source",
        "url": "https://gitlab.com/Atharok/BtRemote"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/packages/com.atharok.btremote/"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=com.atharok.btremote.gplay"
      }
    ],
    "flags": ""
  },
  {
    "name": "KDE Connect",
    "category": "Connectivity",
    "description": "A multi-platform app that allows your devices to communicate with each other",
    "links": [
      {
        "label": "Source",
        "url": "https://invent.kde.org/network/kdeconnect-android"
      },
      {
        "label": "Website",
        "url": "https://community.kde.org/KDEConnect"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/en/packages/org.kde.kdeconnect_tp"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=org.kde.kdeconnect_tp"
      }
    ],
    "flags": ""
  },
  {
    "name": "LinkLoom",
    "category": "Connectivity",
    "description": "A Android TV Application To Show Browsers, History, Save Web Pages Links, Share Links Between Android Mobile app and TV",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/Yazan98/LinkLoomTv"
      }
    ],
    "flags": ""
  },
  {
    "name": "LocalSend",
    "category": "Connectivity",
    "description": "Allows you to securely share files and messages with nearby devices over your local network without needing an internet connection",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/localsend/localsend"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/packages/org.localsend.localsend_app"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=org.localsend.localsend_app"
      }
    ],
    "flags": ""
  },
  {
    "name": "Aves",
    "category": "Gallery",
    "description": "Gallery and metadata explorer",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/deckerst/aves"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/packages/deckers.thibault.aves.libre"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=deckers.thibault.aves"
      }
    ],
    "flags": ""
  },
  {
    "name": "Immich Android TV",
    "category": "Gallery",
    "description": "An Android TV app for the self hosted photos and videos backup solution",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/giejay/Immich-Android-TV"
      }
    ],
    "flags": ""
  },
  {
    "name": "Heads-up",
    "category": "Notifications",
    "description": "Get the new heads-up notifications",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/SimenCodes/heads-up"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=codes.simen.l50notifications"
      }
    ],
    "flags": ""
  },
  {
    "name": "Aerial Views",
    "category": "Screen Saver",
    "description": "A screen saver for Android TV",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/theothernt/AerialViews"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=com.neilturner.aerialviews"
      }
    ],
    "flags": ""
  },
  {
    "name": "DNSNet",
    "category": "DNS Proxy",
    "description": "a DNS-based host blocker (and lightweight ad blocker) that creates a VPN locally to apply its rules and block unwanted requests",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/t895/DNSNet"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/packages/dev.clombardo.dnsnet/"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=dev.clombardo.dnsnet"
      }
    ],
    "flags": ""
  },
  {
    "name": "Intra",
    "category": "DNS Proxy",
    "description": "An experimental tool that allows you to test new DNS-over-HTTPS services on Android",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/Jigsaw-Code/Intra"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/en/packages/app.intra/"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=app.intra"
      }
    ],
    "flags": ""
  },
  {
    "name": "InviZible Pro",
    "category": "DNS Proxy",
    "description": "Comprehensive application for on-line privacy and security",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/Gedsh/InviZible"
      },
      {
        "label": "Website",
        "url": "https://invizible.net"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/packages/pan.alexander.tordnscrypt.stable/"
      },
      {
        "label": "Google Play",
        "url": "https://f-droid.org/packages/pan.alexander.tordnscrypt.stable/"
      }
    ],
    "flags": ""
  },
  {
    "name": "OpenVPN",
    "category": "VPN",
    "description": "With the new VPNService of Android API level 14+ (Ice Cream Sandwich) it is possible to create a VPN service that does not need root access",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/schwabe/ics-openvpn"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/en/packages/de.blinkt.openvpn/"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=de.blinkt.openvpn"
      },
      {
        "label": "Website",
        "url": "https://ics-openvpn.blinkt.de/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Proton VPN",
    "category": "VPN",
    "description": "Free Swiss VPN with advanced security and privacy features",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/ProtonVPN/android-app"
      },
      {
        "label": "Website",
        "url": "https://protonvpn.com/"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/en/packages/ch.protonvpn.android/"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=ch.protonvpn.android"
      }
    ],
    "flags": ""
  },
  {
    "name": "Shadowsocks",
    "category": "VPN",
    "description": "A shadowsocks client for Android TV. Shadowsocks is a fast tunnel proxy that helps you bypass firewalls",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/shadowsocks/shadowsocks-android"
      },
      {
        "label": "Website",
        "url": "https://shadowsocks.org/"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/en/packages/com.github.shadowsocks.tv/"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=com.github.shadowsocks.tv"
      }
    ],
    "flags": ""
  },
  {
    "name": "Tailscale",
    "category": "VPN",
    "description": "Mesh VPN based on WireGuard",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/tailscale/tailscale-android"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/en/packages/com.tailscale.ipn/"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=com.tailscale.ipn"
      },
      {
        "label": "Website",
        "url": "https://tailscale.com/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Windscribe",
    "category": "VPN",
    "description": "Free VPN that unblocks geo-restricted content and eliminates tracking",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/Windscribe/Android-App"
      },
      {
        "label": "Website",
        "url": "https://windscribe.com/"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/en/packages/com.windscribe.vpn/"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=com.windscribe.vpn"
      }
    ],
    "flags": ""
  },
  {
    "name": "Recording Webcam",
    "category": "Capturing",
    "description": "Camera App for android TV",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/ChunhThanhDe/Recording-Webcam"
      },
      {
        "label": "IzzyOnDroid",
        "url": "https://apt.izzysoft.de/fdroid/index/apk/com.box.project.recording_app"
      }
    ],
    "flags": ""
  },
  {
    "name": "APKUpdater",
    "category": "System Utilities",
    "description": "An open source tool that simplifies the process of finding updates for your installed apps",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/rumboalla/apkupdater"
      },
      {
        "label": "IzzyOnDroid",
        "url": "https://apt.izzysoft.de/fdroid/index/apk/com.apkupdater"
      }
    ],
    "flags": ""
  },
  {
    "name": "App Manager",
    "category": "System Utilities",
    "description": "A full-featured open source package manager for android",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/MuntashirAkon/AppManager"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/packages/io.github.muntashirakon.AppManager"
      }
    ],
    "flags": ""
  },
  {
    "name": "CPU Info",
    "category": "System Utilities",
    "description": "a KMP application which provides information about device hardware and software",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/kamgurgul/cpu-info"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/packages/com.kgurgul.cpuinfo/"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=com.kgurgul.cpuinfo"
      }
    ],
    "flags": ""
  },
  {
    "name": "DAVx⁵",
    "category": "System Utilities",
    "description": "A CalDAV/CardDAV (and webdav provider) management and synchronization app for Android which natively integrates with Android calendar/contact apps",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/bitfireAT/davx5-ose/"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/en/packages/at.bitfire.davdroid/"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=at.bitfire.davdroid"
      },
      {
        "label": "Website",
        "url": "https://www.davx5.com/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Key Mapper",
    "category": "System Utilities",
    "description": "An Android app that change what the buttons do on your devices",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/keymapperorg/KeyMapper"
      },
      {
        "label": "Website",
        "url": "http://docs.keymapper.club/"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/packages/io.github.sds100.keymapper/"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=io.github.sds100.keymapper"
      }
    ],
    "flags": ""
  },
  {
    "name": "Launch-On-Boot",
    "category": "System Utilities",
    "description": "Launches a TV app when the device boots",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/ITVlab/Launch-On-Boot"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/packages/news.androidtv.launchonboot/"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=news.androidtv.launchonboot"
      }
    ],
    "flags": ""
  },
  {
    "name": "MATVT",
    "category": "System Utilities",
    "description": "Virtual Mouse for Android TV that can be controlled via remote itself",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/virresh/matvt"
      }
    ],
    "flags": ""
  },
  {
    "name": "Neo Backup",
    "category": "System Utilities",
    "description": "open-source tool to backup your apps and data",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/NeoApplications/Neo-Backup"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/packages/com.machiav3lli.backup/"
      }
    ],
    "flags": ""
  },
  {
    "name": "NetGuard",
    "category": "System Utilities",
    "description": "A simple way to block access to the internet per application",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/M66B/NetGuard"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/en/packages/eu.faircode.netguard/"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=eu.faircode.netguard"
      },
      {
        "label": "Website",
        "url": "https://netguard.me/"
      }
    ],
    "flags": ""
  },
  {
    "name": "Quick Settings",
    "category": "System Utilities",
    "description": "Quick Settings provides quick access to various Android system settings",
    "links": [
      {
        "label": "Source",
        "url": "https://f-droid.org/repo/com.bwx.bequick_201107260_src.tar.gz"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/en/packages/com.bwx.bequick/"
      }
    ],
    "flags": ""
  },
  {
    "name": "SD Maid SE",
    "category": "System Utilities",
    "description": "Android's most thorough cleaning tool",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/d4rken-org/sdmaid-se"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/en/packages/eu.darken.sdmse/"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=eu.darken.sdmse"
      }
    ],
    "flags": ""
  },
  {
    "name": "Shizuku",
    "category": "System Utilities",
    "description": "Using system APIs directly with adb/root privileges from normal apps",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/RikkaApps/Shizuku"
      },
      {
        "label": "Website",
        "url": "https://shizuku.rikka.app/"
      },
      {
        "label": "IzzyOnDroid",
        "url": "https://apt.izzysoft.de/fdroid/index/apk/moe.shizuku.privileged.api"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=moe.shizuku.privileged.api"
      }
    ],
    "flags": ""
  },
  {
    "name": "Termux",
    "category": "System Utilities",
    "description": "A free and open source cross-platform terminal emulator and IDE",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/termux/termux-app"
      },
      {
        "label": "F-Droid",
        "url": "https://f-droid.org/en/packages/com.termux"
      }
    ],
    "flags": ""
  },
  {
    "name": "WebDAV Provider",
    "category": "System Utilities",
    "description": "An Android app that can expose WebDAV through Android's Storage Access Framework (SAF)",
    "links": [
      {
        "label": "Source",
        "url": "https://github.com/alexbakker/webdav-provider"
      },
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=dev.rocli.android.webdav"
      }
    ],
    "flags": ""
  }
];

export const tvCategories = Array.from(new Set(tvApps.map(a => a.category))).sort();

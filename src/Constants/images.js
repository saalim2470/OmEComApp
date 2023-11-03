const images = {
  back_Icon: require("../utils/assets/images/backIcon.png"),
  close_Icon: require("../utils/assets/images/closeIcon.png"),
  sendColorIcon: require("../utils/assets/images/sendColorIcon.png"),
  introImg1: require("../utils/assets/images/introImg1.jpg"),
  introImg2: require("../utils/assets/images/introImg2.jpg"),
  introImg3: require("../utils/assets/images/introImg3.jpg"),
  splashImg: require("../utils/assets/images/splashImg.jpg"),
  omLogo: require("../utils/assets/images/omLogo.png"),
  facebookIcon: require("../utils/assets/images/facebook.png"),
  appleIcon: require("../utils/assets/images/apple.png"),
  googleIcon: require("../utils/assets/images/google.png"),
  loginImg2: require("../utils/assets/images/loginImg2.png"),
  homeFillIcon: require("../utils/assets/images/homeFillIcon.png"),
  homeIcon: require("../utils/assets/images/homeIcon.png"),
  searchIcon: require("../utils/assets/images/searchIcon.png"),
  plusIcon: require("../utils/assets/images/plusIcon.png"),
  emailIcon: require("../utils/assets/images/emailIcon.png"),
  userIcon: require("../utils/assets/images/userIcon.png"),
  userFillIcon: require("../utils/assets/images/userFillIcon.png"),
  menuIcon: require("../utils/assets/images/menuIcon.png"),
  bagIcon: require("../utils/assets/images/bagIcon.png"),
  optionIcon: require("../utils/assets/images/optionIcon.png"),
  bookmarkIcon: require("../utils/assets/images/bookmarkIcon.png"),
  bookmarkFillIcon: require("../utils/assets/images/bookmarkFillIcon.png"),
  messageIcon: require("../utils/assets/images/messageIcon.png"),
  unLikeIcon: require("../utils/assets/images/unLikeIcon.png"),
  filterIcon: require("../utils/assets/images/filterIcon.png"),
  profileIcon: require("../utils/assets/images/profileIcon.png"),
  closeCircleIcon: require("../utils/assets/images/closeCircleIcon.png"),
  whatsAppLogo: require("../utils/assets/images/whatsAppLogo.png"),
  phoneIcon: require("../utils/assets/images/phoneIcon.png"),
  downArrow: require("../utils/assets/images/downArrow.png"),
  fileUploaderIcon: require("../utils/assets/images/fileUploaderIcon.png"),
  emojiIcon: require("../utils/assets/images/emojiIcon.png"),
  micIcon: require("../utils/assets/images/micIcon.png"),
  reviewStar: require("../utils/assets/images/reviewStar.png"),
  editIcon: require("../utils/assets/images/editIcon.png"),
  uploadFillIcon: require("../utils/assets/images/uploadFillIcon.png"),
  dollorIcon: require("../utils/assets/images/dollorIcon.png"),
  cat_animalIcon: require("../utils/assets/images/cat_animalIcon.png"),
  cat_electricIcon: require("../utils/assets/images/cat_electricIcon.png"),
  cat_electronicsIcon: require("../utils/assets/images/cat_electronicsIcon.png"),
  cat_farmingIcon: require("../utils/assets/images/cat_farmingIcon.png"),
  cat_fruitIcon: require("../utils/assets/images/cat_fruitIcon.png"),
  cat_homeDecorIcon: require("../utils/assets/images/cat_homeDecorIcon.png"),
  cat_othersIcon: require("../utils/assets/images/cat_othersIcon.png"),
  cat_vehicalIcon: require("../utils/assets/images/cat_vehicalIcon.png"),
  notificationIcon: require("../utils/assets/images/notificationIcon.png"),
  logoutIcon: require("../utils/assets/images/logoutIcon.png"),
  announcmentIcon: require("../utils/assets/images/announcmentIcon.png"),

  clothesIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><defs><style>.cls-1{fill:#db5669}.cls-2{fill:#c4455e}.cls-5{fill:#edebf2}</style></defs><g id="Merchandise_Clothes" data-name="Merchandise Clothes"><path class="cls-1" d="M32 1a8 8 0 0 1-16 0z"/><path class="cls-2" d="M29 1a8 8 0 0 1-6.5 7.85A8 8 0 0 0 32 1z"/><path class="cls-1" d="m47 19-9 8v20H10V27l-9-8s2.43-5.57 7-16l8-2a8 8 0 0 0 16 0l8 2c4.57 10.43 7 16 7 16z"/><path d="m47 19-9 8v18H19a6 6 0 0 1-6-6V1.75L16 1a8 8 0 0 0 16 0l8 2z" style="fill:#f26674"/><path class="cls-1" d="M40 18v7.22L38 27v-9a1 1 0 0 1 2 0z"/><path class="cls-2" d="M10 18v9l-2-1.78V18a1 1 0 0 1 2 0z"/><path d="m5.29 19.71-3.2-3.2.86-2 3.76 3.76a1 1 0 0 1-1.42 1.44z" style="fill:#dad7e5"/><path class="cls-5" d="M45.91 16.51C42.44 20 42.56 20 42 20a1 1 0 0 1-.71-1.71l3.76-3.76zM17 37a1 1 0 0 1-.71-1.71l14-14a1 1 0 0 1 1.42 1.42C16.41 38 17.59 37 17 37zM19 28a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm0-6a2 2 0 1 0 2 2 2 2 0 0 0-2-2zM29 38a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm0-6a2 2 0 1 0 2 2 2 2 0 0 0-2-2z"/></g></svg>`,
  groceryIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-6{fill:#fc715a}.cls-7{fill:#f55b4b}.cls-9{fill:#d89221}.cls-10{fill:#eaa936}.cls-11{fill:#c17f1f}.cls-12{fill:#d69732}.cls-14{fill:#009950}</style></defs><circle cx="256" cy="256" r="256" style="fill:#f7bb38" id="BULINE"/><g id="Icons"><path d="M512 256c0 141.38-114.62 256-256 256S0 397.38 0 256a256.1 256.1 0 0 1 10.65-73.32h490.7A256.1 256.1 0 0 1 512 256z" style="fill:#32314b"/><path d="M447.62 425.52h-384a16 16 0 0 1-15.93-17.66l21.7-210.8a16 16 0 0 1 15.93-14.38h340.6a16 16 0 0 1 15.93 14.38l21.7 210.8a16 16 0 0 1-15.93 17.66z" style="fill:#fff"/><path d="M401.11 396.1h-291a12.14 12.14 0 0 1-12.07-13.38L114.54 223a12.13 12.13 0 0 1 12.07-10.89h258.05A12.13 12.13 0 0 1 396.73 223l16.45 159.73a12.14 12.14 0 0 1-12.07 13.37z" style="fill:#e5e5e5"/><path d="M196.6 162.07a10.75 10.75 0 0 1-3.6-13.68c2-4 49.35-97.49 128.53-117.3A10.76 10.76 0 1 1 326.79 52c-69.49 17.35-114.06 105.11-114.5 106a10.77 10.77 0 0 1-14.43 4.82 9.7 9.7 0 0 1-1.26-.75z" style="fill:#d8864e"/><path class="cls-6" d="m224.47 140.85-18.09-14.56a18.05 18.05 0 0 0-26.25 3.91L104.09 242c-27.44 40.32-29.5 86.75-4.61 103.68s67.31-2 94.75-42.36c14-20.58 21.39-42.74 22-61.77a279.31 279.31 0 0 1 14.09-80.94 18 18 0 0 0-5.85-19.76z"/><path class="cls-7" d="m215.57 157.22-15.27-12.29a15.24 15.24 0 0 0-22.15 3.3L114 242.57c-23.16 34-24.9 73.22-3.89 87.51s56.81-1.71 80-35.75c11.82-17.37 18-36.08 18.54-52.13a235.63 235.63 0 0 1 11.88-68.32 15.18 15.18 0 0 0-4.96-16.66z"/><path d="M296.67 162.07a10.76 10.76 0 0 0 3.57-13.68c-2-4-49.36-97.49-128.54-117.3A10.76 10.76 0 1 0 166.48 52C236 69.35 280.54 157.11 281 158a10.76 10.76 0 0 0 14.43 4.82 11.24 11.24 0 0 0 1.24-.75z" style="fill:#ef995e"/><path class="cls-6" d="m268.8 140.85 18.08-14.56a18.05 18.05 0 0 1 26.25 3.91L389.18 242c27.43 40.32 29.5 86.75 4.6 103.68s-67.31-2-94.74-42.36c-14-20.58-21.4-42.74-22-61.77A279.3 279.3 0 0 0 263 160.59a18 18 0 0 1 5.8-19.74z"/><path class="cls-7" d="m277.7 157.22 15.3-12.29a15.25 15.25 0 0 1 22.16 3.3l64.18 94.34c23.15 34 24.9 73.22 3.89 87.51s-56.82-1.71-80-35.75c-11.83-17.33-18.07-36.08-18.55-52.13a235.64 235.64 0 0 0-11.89-68.32 15.2 15.2 0 0 1 4.91-16.66z"/><ellipse class="cls-9" cx="242.93" cy="311.43" rx="43.85" ry="60.66" transform="rotate(-20.51 242.915 311.407)"/><ellipse class="cls-10" cx="242.93" cy="311.43" rx="38.1" ry="52.71" transform="rotate(-20.51 242.915 311.407)"/><path class="cls-11" d="M198.05 285.5a81.85 81.85 0 0 0 4.6 18.62c.07.19.15.39.23.58 11.87 31 39.56 49.3 62.1 40.87a34.64 34.64 0 0 0 17.57-15.1 50.36 50.36 0 0 0 6.05-15.78c3.07 24.66-6.23 46.76-24.41 53.56-22.68 8.49-50.58-10.07-62.32-41.46-5.38-14.36-6.43-28.92-3.82-41.29z"/><path class="cls-12" d="M282.55 330.47c-2.05 14.39-9.51 26-21.14 30.34-19.71 7.36-44-8.77-54.16-36a70.27 70.27 0 0 1-4.37-20.08c11.87 31 39.56 49.3 62.1 40.87a34.64 34.64 0 0 0 17.57-15.13z"/><ellipse class="cls-9" cx="181.44" cy="323.61" rx="60.66" ry="43.85" transform="rotate(-22.5 181.446 323.614)"/><ellipse class="cls-10" cx="181.44" cy="323.61" rx="52.71" ry="38.1" transform="rotate(-22.5 181.446 323.614)"/><path class="cls-11" d="M205.79 277.85a82 82 0 0 0-18.45 5.25l-.57.25c-30.6 12.94-47.9 41.25-38.69 63.48a34.8 34.8 0 0 0 15.7 17 50.48 50.48 0 0 0 16 5.49c-24.54 3.93-47-4.6-54.38-22.53-9.27-22.37 8.31-50.9 39.27-63.73 14.15-5.83 28.66-7.39 41.12-5.21z"/><path class="cls-12" d="M163.78 363.87c-14.44-1.55-26.28-8.61-31.05-20.08-8-19.44 7.23-44.24 34.12-55.38a70.2 70.2 0 0 1 19.92-5.06c-30.6 12.94-47.9 41.25-38.69 63.48a34.8 34.8 0 0 0 15.7 17.04z"/><path d="M405.06 372.23c0-3.91-5.83-7.25-14-8.55a4 4 0 0 1-3.31-4 7 7 0 0 0-2.3-4.86 3.81 3.81 0 0 1 .87-6c2.69-1.52 4.27-3.41 4.27-5.45 0-5-9.69-9.13-21.64-9.13a43 43 0 0 0-13.62 2 3.9 3.9 0 0 1-3.25-.33c-5.44-3.15-14.25-5.2-24.2-5.2-16.54 0-29.94 5.66-29.94 12.63a4.44 4.44 0 0 0 0 .63c-16.22 2-28.09 8.24-28.09 15.7 0 3.13 2.08 6 5.69 8.53a3.83 3.83 0 0 1-.05 6.33c-2.21 1.43-3.5 3.14-3.5 5 0 5 9.69 9.13 21.65 9.13 7.27 0 13.7-1.51 17.62-3.83a3.77 3.77 0 0 1 3.21-.26 59.1 59.1 0 0 0 8.53 2.33 3.83 3.83 0 0 1 2.64 2.06c3.14 6.27 16.32 11 32.11 11 18.13 0 32.83-6.2 32.83-13.85a6.31 6.31 0 0 0-.14-1.3 3.85 3.85 0 0 1 3-4.47c6.95-1.56 11.62-4.6 11.62-8.11z" style="fill:#00b564"/><ellipse class="cls-14" cx="359.94" cy="347.27" rx="10.33" ry="5"/><ellipse class="cls-14" cx="301.37" cy="352.27" rx="10.33" ry="5"/><ellipse class="cls-14" cx="352.94" cy="383.27" rx="10.33" ry="5"/><ellipse class="cls-14" cx="301.37" cy="375.3" rx="10.33" ry="5"/><ellipse class="cls-14" cx="332.27" cy="365.3" rx="10.33" ry="5"/><ellipse class="cls-14" cx="373.6" cy="370.3" rx="10.33" ry="5"/></g></svg>`,
  toyIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" style="enable-background:new 0 0 64 64" xml:space="preserve"><path style="fill:#262626" d="M21.523 23.117c-2.446 0-4.439 1.992-4.439 4.439s1.992 4.439 4.439 4.439 4.439-1.992 4.439-4.439-1.993-4.439-4.439-4.439zm0 6.813c-1.301 0-2.374-1.063-2.374-2.374s1.074-2.374 2.374-2.374a2.374 2.374 0 0 1 0 4.748zm20.944-6.813c-2.446 0-4.439 1.992-4.439 4.439s1.992 4.439 4.439 4.439c2.446 0 4.439-1.992 4.439-4.439s-1.992-4.439-4.439-4.439zm0 6.813c-1.301 0-2.374-1.063-2.374-2.374s1.074-2.374 2.374-2.374a2.374 2.374 0 0 1 0 4.748zm-6.493 16.455c-.01.01-.826.939-1.879.96-.63-.01-1.29-.32-1.941-1.001-.392-.403-1.105-.403-1.497 0-.64.681-1.29 1.001-1.93 1.001-1.053-.021-1.879-.95-1.879-.95l-1.569 1.332c.134.165 1.425 1.621 3.376 1.683h.114c.929 0 1.806-.32 2.643-.96.867.661 1.796 1.012 2.756.96 1.941-.062 3.231-1.517 3.376-1.683l-1.57-1.342zM32 33.843a3.805 3.805 0 1 0 0 7.608 3.81 3.81 0 0 0 3.809-3.799A3.812 3.812 0 0 0 32 33.843zm0 5.543a1.74 1.74 0 0 1-1.745-1.734c0-.96.785-1.745 1.745-1.745.96 0 1.745.785 1.745 1.745A1.74 1.74 0 0 1 32 39.386zm10.467-16.269c-2.446 0-4.439 1.992-4.439 4.439s1.992 4.439 4.439 4.439c2.446 0 4.439-1.992 4.439-4.439s-1.992-4.439-4.439-4.439zm0 6.813c-1.301 0-2.374-1.063-2.374-2.374s1.074-2.374 2.374-2.374a2.374 2.374 0 0 1 0 4.748zM32 30.725c-6.854 0-12.428 5.574-12.428 12.428 0 6.844 5.574 12.418 12.428 12.418s12.428-5.574 12.428-12.418c0-6.854-5.574-12.428-12.428-12.428zm0 22.782c-5.719 0-10.364-4.645-10.364-10.354 0-5.719 4.645-10.364 10.364-10.364 5.708 0 10.364 4.645 10.364 10.364 0 5.709-4.656 10.354-10.364 10.354zm2.096-6.162c-.63-.01-1.29-.32-1.941-1.001-.392-.403-1.105-.403-1.497 0-.64.681-1.29 1.001-1.93 1.001-1.053-.021-1.879-.95-1.879-.95l-1.569 1.332c.134.165 1.425 1.621 3.376 1.683h.114c.929 0 1.806-.32 2.643-.96.867.661 1.796 1.012 2.756.96 1.941-.062 3.231-1.517 3.376-1.683l-1.569-1.342c-.012.01-.828.939-1.88.96zM32 41.45a3.81 3.81 0 0 0 3.809-3.799A3.813 3.813 0 0 0 32 33.842a3.804 3.804 0 1 0 0 7.608zm0-5.543c.96 0 1.745.785 1.745 1.745A1.74 1.74 0 0 1 32 39.386a1.74 1.74 0 0 1-1.745-1.734c0-.96.785-1.745 1.745-1.745zm-6.039-8.351a4.446 4.446 0 0 0-4.439-4.439c-2.446 0-4.439 1.992-4.439 4.439s1.992 4.439 4.439 4.439a4.445 4.445 0 0 0 4.439-4.439zm-6.813 0a2.381 2.381 0 0 1 2.374-2.374 2.374 2.374 0 0 1 0 4.748 2.381 2.381 0 0 1-2.374-2.374zM64 14.013c0-7.05-5.739-12.779-12.779-12.779A12.742 12.742 0 0 0 40.95 6.437a28.825 28.825 0 0 0-17.9 0c-2.416-3.262-6.204-5.203-10.271-5.203C5.729 1.234 0 6.963 0 14.013a12.74 12.74 0 0 0 4.862 10.003 28.762 28.762 0 0 0-1.745 9.868c0 15.928 12.955 28.883 28.883 28.883 15.917 0 28.883-12.955 28.883-28.883 0-3.458-.619-6.782-1.745-9.868C62.183 21.6 64 17.935 64 14.013zm-61.935 0c0-5.915 4.81-10.715 10.715-10.715 3.21 0 6.214 1.435 8.248 3.881a29.025 29.025 0 0 0-15.35 14.854 10.718 10.718 0 0 1-3.613-8.02zM32 60.702c-14.792 0-26.818-12.026-26.818-26.818C5.182 19.102 17.208 7.076 32 7.076c14.782 0 26.818 12.026 26.818 26.808 0 14.792-12.036 26.818-26.818 26.818zm26.323-38.668c-3.035-6.699-8.537-12.046-15.35-14.854a10.713 10.713 0 0 1 8.248-3.881c5.905 0 10.715 4.8 10.715 10.715a10.728 10.728 0 0 1-3.613 8.02zm-15.856 1.083c-2.446 0-4.439 1.992-4.439 4.439s1.992 4.439 4.439 4.439c2.446 0 4.439-1.992 4.439-4.439s-1.992-4.439-4.439-4.439zm0 6.813c-1.301 0-2.374-1.063-2.374-2.374s1.074-2.374 2.374-2.374a2.374 2.374 0 0 1 0 4.748zM32 30.725c-6.854 0-12.428 5.574-12.428 12.428 0 6.844 5.574 12.418 12.428 12.418s12.428-5.574 12.428-12.418c0-6.854-5.574-12.428-12.428-12.428zm0 22.782c-5.719 0-10.364-4.645-10.364-10.354 0-5.719 4.645-10.364 10.364-10.364 5.708 0 10.364 4.645 10.364 10.364 0 5.709-4.656 10.354-10.364 10.354zm2.096-6.162c-.63-.01-1.29-.32-1.941-1.001-.392-.403-1.105-.403-1.497 0-.64.681-1.29 1.001-1.93 1.001-1.053-.021-1.879-.95-1.879-.95l-1.569 1.332c.134.165 1.425 1.621 3.376 1.683h.114c.929 0 1.806-.32 2.643-.96.867.661 1.796 1.012 2.756.96 1.941-.062 3.231-1.517 3.376-1.683l-1.569-1.342c-.012.01-.828.939-1.88.96zM32 41.45a3.81 3.81 0 0 0 3.809-3.799A3.813 3.813 0 0 0 32 33.842a3.804 3.804 0 1 0 0 7.608zm0-5.543c.96 0 1.745.785 1.745 1.745A1.74 1.74 0 0 1 32 39.386a1.74 1.74 0 0 1-1.745-1.734c0-.96.785-1.745 1.745-1.745zm-6.039-8.351a4.446 4.446 0 0 0-4.439-4.439c-2.446 0-4.439 1.992-4.439 4.439s1.992 4.439 4.439 4.439a4.445 4.445 0 0 0 4.439-4.439zm-6.813 0a2.381 2.381 0 0 1 2.374-2.374 2.374 2.374 0 0 1 0 4.748 2.381 2.381 0 0 1-2.374-2.374zm16.826 18.829c-.01.01-.826.939-1.879.96-.63-.01-1.29-.32-1.941-1.001-.392-.403-1.105-.403-1.497 0-.64.681-1.29 1.001-1.93 1.001-1.053-.021-1.879-.95-1.879-.95l-1.569 1.332c.134.165 1.425 1.621 3.376 1.683h.114c.929 0 1.806-.32 2.643-.96.867.661 1.796 1.012 2.756.96 1.941-.062 3.231-1.517 3.376-1.683l-1.57-1.342zM32 41.45a3.81 3.81 0 0 0 3.809-3.799A3.813 3.813 0 0 0 32 33.842a3.804 3.804 0 1 0 0 7.608zm0-5.543c.96 0 1.745.785 1.745 1.745A1.74 1.74 0 0 1 32 39.386a1.74 1.74 0 0 1-1.745-1.734c0-.96.785-1.745 1.745-1.745zm0-5.182c-6.854 0-12.428 5.574-12.428 12.428 0 6.844 5.574 12.418 12.428 12.418s12.428-5.574 12.428-12.418c0-6.854-5.574-12.428-12.428-12.428zm0 22.782c-5.719 0-10.364-4.645-10.364-10.354 0-5.719 4.645-10.364 10.364-10.364 5.708 0 10.364 4.645 10.364 10.364 0 5.709-4.656 10.354-10.364 10.354zm2.096-6.162c-.63-.01-1.29-.32-1.941-1.001-.392-.403-1.105-.403-1.497 0-.64.681-1.29 1.001-1.93 1.001-1.053-.021-1.879-.95-1.879-.95l-1.569 1.332c.134.165 1.425 1.621 3.376 1.683h.114c.929 0 1.806-.32 2.643-.96.867.661 1.796 1.012 2.756.96 1.941-.062 3.231-1.517 3.376-1.683l-1.569-1.342c-.012.01-.828.939-1.88.96zM32 41.45a3.81 3.81 0 0 0 3.809-3.799A3.813 3.813 0 0 0 32 33.842a3.804 3.804 0 1 0 0 7.608zm0-5.543c.96 0 1.745.785 1.745 1.745A1.74 1.74 0 0 1 32 39.386a1.74 1.74 0 0 1-1.745-1.734c0-.96.785-1.745 1.745-1.745z"/><path style="fill:#d89f00" d="M32 7.076c-14.792 0-26.818 12.026-26.818 26.808 0 14.792 12.026 26.818 26.818 26.818 14.782 0 26.818-12.026 26.818-26.818C58.818 19.102 46.782 7.076 32 7.076zm-14.916 20.48a4.446 4.446 0 0 1 4.439-4.439c2.447 0 4.439 1.992 4.439 4.439s-1.992 4.439-4.439 4.439a4.445 4.445 0 0 1-4.439-4.439zM32 55.572c-6.854 0-12.428-5.574-12.428-12.418 0-6.854 5.574-12.428 12.428-12.428S44.428 36.3 44.428 43.154c0 6.843-5.574 12.418-12.428 12.418zm10.467-23.577c-2.446 0-4.439-1.992-4.439-4.439s1.992-4.439 4.439-4.439c2.446 0 4.439 1.992 4.439 4.439s-1.992 4.439-4.439 4.439z"/></svg>`,
  electronicIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" style="enable-background:new 0 0 128 128" xml:space="preserve"><path style="fill:#92f7dd" d="M92.566 125.216H35.432c-6.762 0-12.244-5.481-12.244-12.243V15.027c0-6.761 5.483-12.243 12.244-12.243h57.134c6.763 0 12.244 5.483 12.244 12.243v97.946c0 6.763-5.481 12.243-12.244 12.243z"/><path style="fill:#1d252c" d="M37.473 26.435a1.86 1.86 0 0 0-1.855 1.855v13.264a1.86 1.86 0 0 0 1.855 1.855 1.86 1.86 0 0 0 1.855-1.855V28.29a1.86 1.86 0 0 0-1.855-1.855zm0 41.832a1.86 1.86 0 0 0-1.855 1.855v13.264a1.86 1.86 0 0 0 1.855 1.855 1.86 1.86 0 0 0 1.855-1.855V70.122a1.86 1.86 0 0 0-1.855-1.855zm0-41.832a1.86 1.86 0 0 0-1.855 1.855v13.264a1.86 1.86 0 0 0 1.855 1.855 1.86 1.86 0 0 0 1.855-1.855V28.29a1.86 1.86 0 0 0-1.855-1.855zm0 41.832a1.86 1.86 0 0 0-1.855 1.855v13.264a1.86 1.86 0 0 0 1.855 1.855 1.86 1.86 0 0 0 1.855-1.855V70.122a1.86 1.86 0 0 0-1.855-1.855zm0-41.832a1.86 1.86 0 0 0-1.855 1.855v13.264a1.86 1.86 0 0 0 1.855 1.855 1.86 1.86 0 0 0 1.855-1.855V28.29a1.86 1.86 0 0 0-1.855-1.855zm0 41.832a1.86 1.86 0 0 0-1.855 1.855v13.264a1.86 1.86 0 0 0 1.855 1.855 1.86 1.86 0 0 0 1.855-1.855V70.122a1.86 1.86 0 0 0-1.855-1.855z"/><path style="fill:#1d252c" d="M92.568 0H35.432C27.14 0 20.406 6.734 20.406 15.026v97.948c0 8.292 6.734 15.026 15.026 15.026h57.136c8.292 0 15.026-6.734 15.026-15.026V15.026C107.594 6.734 100.86 0 92.568 0zM25.971 15.026c0-5.213 4.248-9.461 9.461-9.461h57.136c5.213 0 9.461 4.248 9.461 9.461v39.921H25.971V15.026zm76.058 97.948c0 5.213-4.248 9.461-9.461 9.461H35.432c-5.213 0-9.461-4.248-9.461-9.461V56.802h76.057v56.172z"/></svg>`,
  homeAppliancesIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" style="enable-background:new 0 0 128 128" xml:space="preserve"><path style="fill:#cfd0d5" d="M7.076 50.655v75.443h80.565V50.655H7.076zm16.483 37.721c0-13.149 10.651-23.8 23.799-23.8 12.261 0 22.341 9.256 23.647 21.162h.735c.431 0 .85.101 1.204.292.85.431 1.433 1.319 1.433 2.346s-.583 1.915-1.433 2.346c-.355.19-.773.292-1.204.292h-.735c-1.306 11.906-11.386 21.162-23.647 21.162-13.148 0-23.799-10.651-23.799-23.8z"/><path style="fill:#1d252c" d="M90.177 0v2.536c16.597 0 30.114 13.504 30.114 30.101h2.536C122.826 14.645 108.182 0 90.177 0zm0 19.958v2.536c5.592 0 10.144 4.552 10.144 10.144h2.536c-.001-6.987-5.694-12.68-12.68-12.68zm0-9.979v2.536c11.095 0 20.122 9.028 20.122 20.122h2.536c0-12.489-10.156-22.658-22.658-22.658zM72.552 83.267c-2.384-11.741-12.768-20.592-25.194-20.592-14.176 0-25.701 11.526-25.701 25.701s11.526 25.701 25.701 25.701c12.426 0 22.81-8.85 25.194-20.592a5.182 5.182 0 0 0 4.362-5.11 5.18 5.18 0 0 0-4.362-5.108zM60.697 93.55h1.636c-2.143 6.2-8.051 10.676-14.974 10.676-8.736 0-15.849-7.113-15.849-15.849s7.113-15.849 15.849-15.849c6.923 0 12.832 4.476 14.974 10.676h-1.636c-2.853 0-5.173 2.32-5.173 5.173s2.32 5.173 5.173 5.173zM47.358 69.991c-10.144 0-18.385 8.242-18.385 18.385s8.242 18.385 18.385 18.385c8.343 0 15.406-5.579 17.637-13.212h3.639c-2.333 9.586-10.993 16.724-21.276 16.724-12.071 0-21.897-9.827-21.897-21.898s9.827-21.898 21.897-21.898c10.283 0 18.943 7.139 21.276 16.724h-3.639c-2.231-7.631-9.294-13.21-17.637-13.21zm25.587 20.731c-.355.19-.773.292-1.204.292H60.697a2.635 2.635 0 0 1-2.637-2.637 2.635 2.635 0 0 1 2.637-2.637h11.044c.431 0 .85.101 1.204.292.85.431 1.433 1.319 1.433 2.346s-.583 1.913-1.433 2.344zM65.3 38.609a2.535 2.535 0 1 0 2.536 2.536 2.544 2.544 0 0 0-2.536-2.536zm11.411-1.268a3.799 3.799 0 0 0-3.804 3.804 3.799 3.799 0 0 0 3.804 3.804 3.807 3.807 0 0 0 3.804-3.804 3.807 3.807 0 0 0-3.804-3.804zm-61.343 1.902v3.804h19.019v-3.804H15.368zm57.184 44.024c-2.384-11.741-12.768-20.592-25.194-20.592-14.176 0-25.701 11.526-25.701 25.701s11.526 25.701 25.701 25.701c12.426 0 22.81-8.85 25.194-20.592a5.182 5.182 0 0 0 4.362-5.11 5.18 5.18 0 0 0-4.362-5.108zM60.697 93.55h1.636c-2.143 6.2-8.051 10.676-14.974 10.676-8.736 0-15.849-7.113-15.849-15.849s7.113-15.849 15.849-15.849c6.923 0 12.832 4.476 14.974 10.676h-1.636c-2.853 0-5.173 2.32-5.173 5.173s2.32 5.173 5.173 5.173zM47.358 69.991c-10.144 0-18.385 8.242-18.385 18.385s8.242 18.385 18.385 18.385c8.343 0 15.406-5.579 17.637-13.212h3.639c-2.333 9.586-10.993 16.724-21.276 16.724-12.071 0-21.897-9.827-21.897-21.898s9.827-21.898 21.897-21.898c10.283 0 18.943 7.139 21.276 16.724h-3.639c-2.231-7.631-9.294-13.21-17.637-13.21zm25.587 20.731c-.355.19-.773.292-1.204.292H60.697a2.635 2.635 0 0 1-2.637-2.637 2.635 2.635 0 0 1 2.637-2.637h11.044c.431 0 .85.101 1.204.292.85.431 1.433 1.319 1.433 2.346s-.583 1.913-1.433 2.344zm3.766-53.381a3.799 3.799 0 0 0-3.804 3.804 3.799 3.799 0 0 0 3.804 3.804 3.807 3.807 0 0 0 3.804-3.804 3.807 3.807 0 0 0-3.804-3.804zM65.3 38.609a2.535 2.535 0 1 0 2.536 2.536 2.544 2.544 0 0 0-2.536-2.536zm-49.932 4.438h19.019v-3.804H15.368v3.804zm72.273-13.313H7.076a1.9 1.9 0 0 0-1.902 1.902v94.463a1.9 1.9 0 0 0 1.902 1.902h80.565a1.9 1.9 0 0 0 1.902-1.902V31.635a1.9 1.9 0 0 0-1.902-1.901zM8.978 33.537h76.761v15.215H8.978V33.537zm76.761 90.659H8.978V52.557h76.761v71.639zm-9.028-86.855a3.799 3.799 0 0 0-3.804 3.804 3.799 3.799 0 0 0 3.804 3.804 3.807 3.807 0 0 0 3.804-3.804 3.807 3.807 0 0 0-3.804-3.804zm-29.353 76.737c12.426 0 22.81-8.85 25.194-20.592a5.182 5.182 0 0 0 4.362-5.11 5.182 5.182 0 0 0-4.362-5.11c-2.384-11.741-12.768-20.592-25.194-20.592-14.176 0-25.701 11.526-25.701 25.701s11.526 25.703 25.701 25.703zm0-47.599c10.283 0 18.943 7.139 21.276 16.724h-3.639c-2.232-7.633-9.294-13.212-17.637-13.212-10.144 0-18.385 8.242-18.385 18.385s8.242 18.385 18.385 18.385c8.343 0 15.406-5.579 17.637-13.212h3.639c-2.333 9.586-10.993 16.724-21.276 16.724-12.071 0-21.897-9.827-21.897-21.898 0-12.07 9.826-21.896 21.897-21.896zM60.697 93.55h1.636c-2.143 6.2-8.051 10.676-14.974 10.676-8.736 0-15.849-7.113-15.849-15.849s7.113-15.849 15.849-15.849c6.923 0 12.832 4.476 14.974 10.676h-1.636c-2.853 0-5.173 2.32-5.173 5.173s2.32 5.173 5.173 5.173zm11.044-7.811c.431 0 .85.101 1.204.292.85.431 1.433 1.319 1.433 2.346s-.583 1.915-1.433 2.346c-.355.19-.773.292-1.204.292H60.697a2.635 2.635 0 0 1-2.637-2.637 2.635 2.635 0 0 1 2.637-2.637h11.044zM65.3 38.609a2.535 2.535 0 1 0 2.536 2.536 2.544 2.544 0 0 0-2.536-2.536zm-49.932 4.438h19.019v-3.804H15.368v3.804z"/></svg>`,
  mobileIcon: `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="655.359" height="655.359" style="shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;fill-rule:evenodd;clip-rule:evenodd" viewBox="0 0 6.827 6.827"><defs><style>.fil2{fill:#2d2d2d}</style></defs><g id="Layer_x0020_1"><g id="_566370784"><g id="Layer_9"><path id="_590424272" d="M4.66 5.893H2.167a.219.219 0 0 1-.219-.218V1.152c0-.12.098-.219.219-.219H4.66c.12 0 .219.098.219.219v4.523c0 .12-.098.218-.22.218z" style="fill:#222025"/><path id="_590424056" style="fill:#e6e7e8" d="M2.094 1.338h2.638V5.18H2.094z"/><circle id="_590423336" class="fil2" cx="3.413" cy="5.537" r=".193"/><circle id="_590423984" class="fil2" cx="2.949" cy="1.136" r=".048"/><path id="_590423864" class="fil2" d="M3.882 1.184h-.657a.044.044 0 0 1-.044-.044v-.003c0-.024.02-.044.044-.044h.657c.024 0 .044.02.044.044v.003c0 .024-.02.044-.044.044z"/><path id="_590422808" d="M3.034 2.437h-.282a.12.12 0 0 1-.12-.12v-.281a.12.12 0 0 1 .12-.12h.282a.12.12 0 0 1 .12.12v.281a.12.12 0 0 1-.12.12z" style="fill:#326fb7"/><path id="_590423240" d="M4.075 2.437h-.282a.12.12 0 0 1-.12-.12v-.281a.12.12 0 0 1 .12-.12h.282a.12.12 0 0 1 .12.12v.281a.12.12 0 0 1-.12.12z" style="fill:#f58120"/><path id="_590422520" d="M3.034 3.52h-.282a.12.12 0 0 1-.12-.12v-.282a.12.12 0 0 1 .12-.12h.282a.12.12 0 0 1 .12.12V3.4a.12.12 0 0 1-.12.12z" style="fill:#da3127"/><path id="_590422904" d="M4.075 3.52h-.282a.12.12 0 0 1-.12-.12v-.282a.12.12 0 0 1 .12-.12h.282a.12.12 0 0 1 .12.12V3.4a.12.12 0 0 1-.12.12z" style="fill:#44b649"/><path id="_590422304" d="M3.034 4.603h-.282a.12.12 0 0 1-.12-.12V4.2a.12.12 0 0 1 .12-.12h.282a.12.12 0 0 1 .12.12v.282a.12.12 0 0 1-.12.12z" style="fill:#00a79d"/><path id="_590421824" d="M4.075 4.603h-.282a.12.12 0 0 1-.12-.12V4.2a.12.12 0 0 1 .12-.12h.282a.12.12 0 0 1 .12.12v.282a.12.12 0 0 1-.12.12z" style="fill:#f8b53c"/></g></g></g><path style="fill:none" d="M0 0h6.827v6.827H0z"/></svg>`,
};

export default images;

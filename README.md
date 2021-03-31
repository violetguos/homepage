# beratbozkurt.net

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) for [english version](#english "english version")

Kişisel blogumu [gatsby](https://www.gatsbyjs.com/ "gatsby") ([starter-blog](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog "starter-blog")) kullanarak geliştirdim. Bu depo ise [beratbozkurt.net](https://beratbozkurt.net/ "beratbozkurt.net")'in kaynak kodlarıdır.

[![Patreon donate button](https://img.shields.io/endpoint.svg?url=https://shieldsio-patreon.vercel.app/api?username=beratbozkurt0&type=patrons&style=for-the-badge)](https://patreon.com/beratbozkurt0 "Support me on Patreon")

## Özellikler

- Markdown ile blog yazılarını yazabilirsin
- Favori projelerini gösterebilirsin
- Flickr kullanarak fotoğraflarını paylaşabilirsin
- Kullanıcılarına karanlık mod özelliğini sunabilirsin
- Webmention.io desteği

![gtmetrix](https://beratbozkurt.net/static/4b9adc0ab011f3bc59caec01c2831a42/d30ee/cover.png)

## Projedeki özel kısımlar?

Temayı kullanmadan önce gatsby'nin nasıl kullanıldığını bilmen gerekiyor. Burada ise temaya özel olan kısımlardan bahsedeceğim.

    .
    ├── content
    ├─────assets
    ├─────blog
    ├─────projects.js
    ├── gatsby-config.js

1.  **`/content`**: Blog yazılarını ve projelerini burada oluşturuyorsun. Zaten benim önceden oluşturduğum içeriklere bakarak nasıl kullanman gerektiğini anlayacaksın. Ekstra olarak ise buradaki assets dosyasında favicon ve profil fotoğrafı saklanıyor.

2.  **`gatsby-config.js`**: Burada bana ait olan bilgileri kendinize göre değiştirmelisiniz. Bir çok kod buradan beslenmektedir.

**not:** `src/pages/photos.js` dosyasını yorum satırına aldım. Çünkü ilk önce flickr üzerinden aldığınız key'i `gatsby-config.js` içerisinde tanımlamanız gerekiyor. Daha sonra kodu aktif edebilirsiniz.

## Son bir şey

Eğer temayı kullanmak isterseniz bana selam vermeyi unutmayın :)

## Lisans

Bu proje açık kaynaklıdır ve [MIT License](LICENSE). ile lisanslanmıştır.

<hr />

# English

I build my homepage with [gatsby](https://www.gatsbyjs.com/ "gatsby") ([starter-blog](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog "starter-blog")). The repository is source code for [beratbozkurt.net](https://beratbozkurt.net/ "beratbozkurt.net")

[![Patreon donate button](https://img.shields.io/endpoint.svg?url=https://shieldsio-patreon.vercel.app/api?username=beratbozkurt0&type=patrons&style=for-the-badge)](https://patreon.com/beratbozkurt0 "Support me on Patreon")

## Features

- Blog post with markdown
- Show your favorite projects
- Share your photos with flickr
- Dark mode
- Webmention.io support

![gtmetrix](https://beratbozkurt.net/static/4b9adc0ab011f3bc59caec01c2831a42/d30ee/cover.png)

## What's special inside?

You should to know how to use gatsby before you fork the template. Because I will just talk about spesific files on here

    .
    ├── content
    ├─────assets
    ├─────blog
    ├─────projects.js
    ├── gatsby-config.js

1.  **`/content`**: There are blog post and projects list on this folder. When you look at inside of this folder you will know how to use it. The assets is only used for favicon and profile photo.

2.  **`gatsby-config.js`**: You should change the information here according to your own. Almost a lot of sections in the code are fed from here.

**not:** I hided all code in `src / pages / photos.js`. Because firstly you need to define the Flickr API key in `gatsby-config.js`. Then you can activate the code.

## Last Thing

If you want to use this template, don't forget to say hello to me :)

## License

This project is open source and available under the [MIT License](LICENSE).

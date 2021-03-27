---
title: "Aklımda Kalsın: React'ta Hataları Yakalayalım"
date: "2021-02-15"
coverImage: "./cover.jpg"
category: ["Yazılım"]
---

İnsan yeni proje geliştirdikçe ve özellikle müşterilere çıkacaksa mutlaka bir şeyin eksik veya yanlış olduğunun farkına varıyor. Bu farkına vardığınız şeyler ise sizin ya eski tecrübelerinizi konuşturup bir fikir ortaya atmanızı ya da eğer benim gibiyseniz bu ihtiyaçları gidermek için yeni şeyler öğrenip onları başarılı bir şekilde uygulamak gerekir.

O yüzden eğer **yazılıma YENİ BAŞLIYORSAN** mutlaka proje yapmalısın. Çünkü yaptığın projeler, kişisel gelişiminin daha verimli bir şekilde artmasını sağlıyor. Aslında tek başına bunu iyi yapıyorsun. Çünkü ben o kısımları yaşadım ve gelişim bir seviyeye kadar oluyor. Kendini bir an önce bir ekibe atmak iyi oluyor. Çünkü farklı kafalar görmüş oluyor ve olması gereken bir çözümü öğrenip ona göre çalışmalar yapabiliyorsunuz.

Bugün bir mobil uygulama yaptığınızı düşüneceğiz. Uygulamanızı hazırlayıp test etme aşamasına geçtiniz. Telefonunuzdan uygulamanıza girdiniz ve açılmıyor (beyaz sayfada kalıyor). Hemen kontrol ediyorsunuz ve local'de çalıştırdığınızda hata alıyorsunuz. Endişelenmeyin çok olası bir durum :) İşte sizin yaşadığınız bu problemi ileride kullanıcılarınızı karşılarken almamak, hatta doğru bir şekilde söylemek gerekirse, kullanıcılarınızı bilgilendirmek iyi bir tercih olacaktır. _"Lütfen tekrar deneyin", "Lütfen uygulama yapımcısı ile iletişime geçin", "Hatayı bildirin"_

<hr>

```javascript
import React, { Component } from "react"

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }
  componentDidCatch(error, errorInfo) {
    console.log({
      error: error,
      errorInfo: errorInfo,
    })

    this.setState({
      error: error,
      errorInfo: errorInfo,
    })
  }

  render() {
    if (this.state.errorInfo) {
      return <h1> BE CAREFULL, DUDE! </h1>
    }
    return this.props.children
  }
}
```

Yukarı kodda belli olduğu gibi react'taki `componentDidCatch` lifecycle yöntemini kullanıyoruz. Bu şekilde ekrana gelen tüm hataları buradan yakalayıp istediğimiz gibi işlemlere sokabiliyoruz. Burada bildiğim kadarıyla şunları yapabilirsiniz:

- Hata olduğu zaman bunun için hazırlanan endpoint ile sürekli iletişim halinde olabilir.
- Eğer Sentry gibi bir servis kullanıyorsanız tetikleme işlemleri yapabilirsiniz.
- Bir mobil uygulama olduğunu düşünürsek Alert mesajı verebilirsiniz.

Aslında anlaşılması kolay bir şey ama bunun varlığından haberdar olmak önemli.

Şimdi gelin bu kodu uygulamaya nasıl uygulayacağız. Öncelikle `src/index.js` dosyasını açalım ve `<App />`'i kapsayacak şekilde yazalım.

```javascript
import { StrictMode } from "react"
import ReactDOM from "react-dom"

import App from "./App"
import ErrorBoundary from "./ErrorBoundary" 

const rootElement = document.getElementById("root")
ReactDOM.render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
  rootElement
)
```

Şimdi daha iyi bir kullanıcı deneyimine sahip ve nerede hata olduğunu kolayca bir şekilde bulmanızı sağlayan bir uygulama yazmaya başlayabilirsiniz :)


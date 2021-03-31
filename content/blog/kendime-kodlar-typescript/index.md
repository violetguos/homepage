---
title: "Kendime Kodlar: TypeScript"
date: "2021-02-13"
coverImage: "./cover.jpg"
category: ["Yazılım"]
---

Eğer kariyerinizi belirleyip o alanda daha iyi bir seviyeye gelmek istiyorsanız mutlaka teknolojileri takip etmelisiniz. En azından güncel kalmalısınız. Özellikle benim gibi yolun başındasınız bu süreçler biraz sizi yoracaktır. Eğer bu iş sizin için bir hobi ise bu süreç eğlenceli bir hal alacaktır.

Söz dizimlerini aklımda tutmakta zorlanıyorum. O yüzden yeni başladığım teknolojilerde mutlaka söz dizimlerini hatırlamak için örnek bir proje üzerinden takip ederim. Bu şekilde yazmak daha kolay oluyor. Yeni bir teknolojiye başlarken ise odaklandığım nokta mantığını anlamak. Bu mantığı anlama kısmı ise piyasanın içinde olduğunda daha kısa sürüyor. 

Bu yazıda ise daha sonra gelip bakacağım için kod bölümleri olacak. Aslında sizlerde burayı **cheatsheet** olarak kullanabilirsiniz. 

<hr >

### TypeScript Tipleri (Types)

Tahminimce en yaygın kullanılanları bir kod bloğu içinde inceleyelim. 

``` javascript
let isim: string = 'berat'; // String tipinde olmalı.
let yas: number; // Number tipinde olmalı
let numara: any; // Herhangi bir tip olabilir
let teknolojiler: string[]; // Stringler'den oluşan bir dizi

yas = 22;
numara = "555 555 55 55";
teknolojiler = ["React", "Redux"]

console.log(`${isim}, ${yas}, ${numara}, ${teknolojiler.join(" - ")}`) // "berat, 22, 555 555 55 55, React - Redux" 

```


`enum` mantığını kafamda kuramadığım için bir tweet attım ve verilen cevap sonucunda biraz da olsa anladım diyebilirim. 

<blockquote class="twitter-tweet"><p lang="tr" dir="ltr">Typescript&#39;te enum&#39;ların olayı nedir? Mantığını anlamadım.</p>&mdash; Berat Bozkurt (@beratbozkurt0) <a href="https://twitter.com/beratbozkurt0/status/1359962186974720011?ref_src=twsrc%5Etfw">February 11, 2021</a></blockquote>

Anladığım kadarıyla `enum` ile tanımlanan tip yapısından çıkmamanı sağlıyor. Ama kanaatimce onun yerine `string literal union` kullanmak daha kolay. 

> Genelde bu terimleri bilmem ve alışkın değilim. Ama bir noktadan sonra bunları bilmek ve bilgi sahibi olmak gerekir. O yüzden kullanarak bunları öğreniyorum.

``` javascript

enum Boyutlar {
  kucuk = "10px",
  orta = "50px",
  buyuk= "100px"
}

console.log(`Aldığım ürün ${Boyutlar.orta} boyutundaydı.`) //"Aldığım ürün 50px boyutundaydı." 

```

`Tuple` sabit bir arrayin içindeki elemanların tipi belli ise kullanabileceğiniz bir tip.
```javascript

let errors: [number, string];
errors= [404, "Not found!"]; 

```

Diğer tiplerden biri ise `unknown`'dur. Any ile arasındaki tek fark; eğer daha önceden tipini belirlediğiniz bir değişkeniniz varsa unknown olarak tanımladığınız değişkeni o değişkene atayamazsınız. Hemen örnek verelim.

```javascript
let durum = true;

let a: any = status // çalışır

let b: unknown;

durum = b; // hata verir

```

`Object Type` yani nesne tipini belirlemek.

```javascript

let kullanici: {
  isim: string;
  yas: number;
  numara: any;
  maas: () => number
}

kullanici = {
  isim: 'Berat',
  yas: 22,
  numara: 5555555555
}

```


### TypeScript Union Type

Kısacası değişkenin alacağı değerleri sınırlamak veya birkaç farklı tipte değer atamasına olanak sağlıyor.

```javascript

let pozisyon: {
  rol: "admin" | "user"; // sadece admin ya da user değerini alabilir.
  TC: string | number; // değer string ya da number tipini alabilir.
}

```

### TypeScript Fonksiyonlar (Functions)

```javascript

const yazdir = (isim: string, yas: number, TC: string | number, numara?: string) : any => {
  return `${isim} ${yas} ${TC} ${numara}`
} 

yazdir("Berat", 22, 11111111111)

```

Tüm olayı tek fonksiyon ile anlatmaya çalıştım. Şimdi gelin neler var bakalım; 
- `isim: string` parametreleri bu şekilde gönderiyoruz. Daha önceden de kullandığımız gibi.
- `numara?: string` burada `?` işareti devreye geliyor. Eğer bu paramtereyi almak zorunda değilsek soru işareti kullanıyoruz. Eğer soru işareti kullanmazsak ve bu parametre gelmezse kod hata verecektir.
- `(...) : any` fonksiyon değer döndürecek ve bu değerin `any` tipinde olması gerektiğini söylüyoruz. 


<hr>

Şuan yukarıda değindiğim konuları aktif olarak kullandığım için bunlar üzerine bu yazıyı oluşturdum. İlerleyen zamanlarda eminim ki class, interface gibi kısımlarla çok ilgileneceğim. O zaman bu yazıyı günceleriz :) 

Aslında **TypeScript** ile ilgili bir proje yapmak isterdim ama örnek projeleri ve videoları incelediğim kadarıyla o kadar karışık bir olay gibi gözükmüyordu. O yüzden sadece genel özelliklerini bir yere not etmek yeterli olacaktı. 


### Kaynaklar
- [The TypeScript Handbook
](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Complete Course | Typescript for Newbies
@codingwithdidem](https://youtu.be/1d92ipW7Mx8?list=WL)
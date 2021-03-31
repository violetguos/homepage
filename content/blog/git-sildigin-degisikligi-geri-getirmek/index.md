---
title: Git Sildiğin Değişikliği Geri Getir!
date: "2021-02-28"
coverImage: "./cover.jpeg"
category: ["Yazılım"]
---

Yaklaşık bir saat önce yeni birkaç özellik yazdım ve o arada git pull yapmadığım için git push yaparken hata verdi. Onları kurtarayım derken yaptığım değişiklikler gitti. Bu gibi senaryolarda yapacak bir şey yok deyip yeniden yazamya başlardım. Ama bu sefer, belki bir yol vardır diye google yolunu tuttum.

Eğer yaptığınız değişikliği `git add` yaptıysanız dosyalar hashlenmiş oluyor. Bu demek oluyor ki git bunu sizin yerinize tutuyor. Ki git'in olayı da bu değil midir? Sonra anlamadığınız şekilde bir şeyler oldu, yaptınız ve bir takım olaylar gelişti. Değişiklikleriniz gitti. Sakin ol ve derin bir nefes alıp yazıyı okumaya devam et.

```bash
  git fsck --lost-found
```

bu kodu kullanarak hashlenmiş olan önceki değişikliği geri getirin. Bu kodu yazdıktan sonra size aşağıdaki gibi bir çıktı oluşturuyor. Aslında bu çıktının aynısı `.git/lost-found` klasörü içinde de kayıt ediyor.

```bash
Checking object directories: 100% (256/256), done.
dangling commit 42fd85940eb2f76f32d4be5ac2d4b***********
dangling commit 831acdb7115a6284f6e969ac90c7f***********
dangling tree 8cc268a3f48c08cd95329fcd73cc306***********
dangling commit ef7fe1814a47fbf89cbcbb1ce39e4***********
```

Çok güzel, yaptığımız değişikliklerin hash'lerine ulaşmış olduk. Şimdi `git cat-file` diye bir komuttan yardım alacağız. Bu kod kısacası, yapılan değişikliklerin içerik, tür ve boyut bilgilerini sağlıyor.

Önce geri getirmek istediğimiz değişikliğin hangisi olduğunu öğrenmek istiyoruz. Bunun için aşağıdaki kodu yazıp commit mesajınıza bakarak doğru bir hash olduğunu doğrulayabilirsiniz.

> **ef7fe181** ifadesi yukarıdaki hash çıktılarının ilk 7 hanesidir.

```bash
➜ git cat-file -p ef7fe181
tree dafb6a5fabb658210e2fa1534670f6***********
parent 84da27f33676589e46711ad35468***********
author Berat Bozkurt <beratbozkurt1999@gmail.com> 1614455618 +0300
committer Berat Bozkurt <beratbozkurt1999@gmail.com> 1614455618 +0300

upload files
```

Daha sonra ise aynı işlemi bu kez tree hash'ini yazarak devam ediyoruz.

```bash
➜ git cat-file -p dafb6a5f
100755 blob 1437c53f70bc211ec65739ec4a8c***********	.gitignore
100755 blob 4b412a3cfa4cabbb3a3d8175d265***********	README.md
040000 tree eaeb7e5f2932b079d4837ca65395***********	components
100644 blob 23c81abc6d8bb55de4bfb9567c8a***********	data.js
100755 blob 36aa1a4dc28f1a7d72c037a4ef0d***********	jsconfig.json
100755 blob 8b94735e5d6a222a721b72f9d543***********	package.json
040000 tree e615f7e6d7712b0e91e484b70529***********	pages
040000 tree 45eb3bc0909b493adf37d7bcb11a***********	public
100755 blob 9f7c9dcc239336c67b8f024a91fe***********	site.config.js
040000 tree 9d0b469049594f9921be80ee33e3***********	styles
100755 blob 52c5fa66a84de8b4387803ec20c8***********	yarn.lock
```

Artık hangi kısımdaki değişiklikler kaybolduysa oradaki içerikleri kolay bir şekilde alabiliriz. Onun için yine aynı kodu kullanıyoruz.

```bash
➜ git cat-file -p  4b412a3
### Hello World

Hello World!
```

Gördüğünüz gibi dosya içeriğini görmüş oluyoruz. Benim edindiğim tecrübe bu şekildeydi. Belki daha iyi ve temiz bir yol vardır ama o yolu keşfedene kadar benim için en iyi yol budur :)

Şimdi **Git** ve yaptığın **değişiklikleri geri getir!**

### Kaynaklar

- [Git accidentally deleted all of my changes (Stackoverflow)](https://stackoverflow.com/a/19628406/8745473)
- [Git inside: Direct work with git objects](https://githowto.com/git_internals_working_directly_with_git_objects)

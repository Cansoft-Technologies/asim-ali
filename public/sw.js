if(!self.define){let e,c={};const a=(a,s)=>(a=new URL(a+".js",s).href,c[a]||new Promise((c=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=c,document.head.appendChild(e)}else e=a,importScripts(a),c()})).then((()=>{let e=c[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(s,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(c[n])return;let r={};const t=e=>a(e,n),o={module:{uri:n},exports:r,require:t};c[n]=Promise.all(s.map((e=>o[e]||t(e)))).then((e=>(i(...e),r)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/ApplicationForm_AsimAli_20200810.pdf",revision:"b7375d0fb34ba9440f9b3b46c66308a7"},{url:"/_next/static/U7DdNl6F1qZbDbcL4WjuD/_buildManifest.js",revision:"58cfd89d084e66d9f4c3325549b38178"},{url:"/_next/static/U7DdNl6F1qZbDbcL4WjuD/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1098-7f7a0b8dbb99f51d.js",revision:"7f7a0b8dbb99f51d"},{url:"/_next/static/chunks/1229.1a7286e78782942f.js",revision:"1a7286e78782942f"},{url:"/_next/static/chunks/1249.b051c9b2bf8436a7.js",revision:"b051c9b2bf8436a7"},{url:"/_next/static/chunks/1306.24eb2800dd32dda2.js",revision:"24eb2800dd32dda2"},{url:"/_next/static/chunks/1380.ba11466b72dcfbe9.js",revision:"ba11466b72dcfbe9"},{url:"/_next/static/chunks/1394.4a4fc31b34f8b975.js",revision:"4a4fc31b34f8b975"},{url:"/_next/static/chunks/2106.447d46e3e7c31af8.js",revision:"447d46e3e7c31af8"},{url:"/_next/static/chunks/2800-086ed56faa71f2c0.js",revision:"086ed56faa71f2c0"},{url:"/_next/static/chunks/2816.380d04ee10d1147a.js",revision:"380d04ee10d1147a"},{url:"/_next/static/chunks/2848.1a79c42031db3cbf.js",revision:"1a79c42031db3cbf"},{url:"/_next/static/chunks/2976.edf2964dae5ac6fc.js",revision:"edf2964dae5ac6fc"},{url:"/_next/static/chunks/2989-0cf09ac48de4b281.js",revision:"0cf09ac48de4b281"},{url:"/_next/static/chunks/2cca2479-72e5c90a4f9ed70b.js",revision:"72e5c90a4f9ed70b"},{url:"/_next/static/chunks/3012-6b858e51f76e171d.js",revision:"6b858e51f76e171d"},{url:"/_next/static/chunks/3042.1a45f4e829555bae.js",revision:"1a45f4e829555bae"},{url:"/_next/static/chunks/3166.35c48dddb5b2221f.js",revision:"35c48dddb5b2221f"},{url:"/_next/static/chunks/3946.e16e797d46487418.js",revision:"e16e797d46487418"},{url:"/_next/static/chunks/4059-42dca25772c541df.js",revision:"42dca25772c541df"},{url:"/_next/static/chunks/4193.195ed44a71e019f9.js",revision:"195ed44a71e019f9"},{url:"/_next/static/chunks/4283.dde909e8efd4d35d.js",revision:"dde909e8efd4d35d"},{url:"/_next/static/chunks/4559.a4a036b713c89f8c.js",revision:"a4a036b713c89f8c"},{url:"/_next/static/chunks/4607-2a91e24846c54133.js",revision:"2a91e24846c54133"},{url:"/_next/static/chunks/471.9065042d84414f37.js",revision:"9065042d84414f37"},{url:"/_next/static/chunks/4803-d86cb40637ecb586.js",revision:"d86cb40637ecb586"},{url:"/_next/static/chunks/492-34d59f2ba417f638.js",revision:"34d59f2ba417f638"},{url:"/_next/static/chunks/5321.87b26f27ec11ba98.js",revision:"87b26f27ec11ba98"},{url:"/_next/static/chunks/5687.cdce4a42cfa1f1bc.js",revision:"cdce4a42cfa1f1bc"},{url:"/_next/static/chunks/6015.4e3c885ab1b98dcf.js",revision:"4e3c885ab1b98dcf"},{url:"/_next/static/chunks/6190.c95a96d97e5f4549.js",revision:"c95a96d97e5f4549"},{url:"/_next/static/chunks/6641.cede9c0e277b8f7d.js",revision:"cede9c0e277b8f7d"},{url:"/_next/static/chunks/6698.f1180893c931bc77.js",revision:"f1180893c931bc77"},{url:"/_next/static/chunks/6868-346c8d542e7cef46.js",revision:"346c8d542e7cef46"},{url:"/_next/static/chunks/6876-af20d29e0e8a52e8.js",revision:"af20d29e0e8a52e8"},{url:"/_next/static/chunks/7127-31ff57399d5d307c.js",revision:"31ff57399d5d307c"},{url:"/_next/static/chunks/7230.62bd9e3ab45ae28b.js",revision:"62bd9e3ab45ae28b"},{url:"/_next/static/chunks/732.7d80302bdc393c18.js",revision:"7d80302bdc393c18"},{url:"/_next/static/chunks/7360.0f4381d3afc353e7.js",revision:"0f4381d3afc353e7"},{url:"/_next/static/chunks/7541-eae5430cc8d40f55.js",revision:"eae5430cc8d40f55"},{url:"/_next/static/chunks/7586.a186753c0fbc5086.js",revision:"a186753c0fbc5086"},{url:"/_next/static/chunks/75fc9c18-f3a061bc3e46a13b.js",revision:"f3a061bc3e46a13b"},{url:"/_next/static/chunks/7686.515da4c7ce55eb49.js",revision:"515da4c7ce55eb49"},{url:"/_next/static/chunks/7954.29d34a386daf6a7a.js",revision:"29d34a386daf6a7a"},{url:"/_next/static/chunks/8500-b1a75b68329efd93.js",revision:"b1a75b68329efd93"},{url:"/_next/static/chunks/8809-c41d75961a5eb477.js",revision:"c41d75961a5eb477"},{url:"/_next/static/chunks/8949-a2174051d0d12d18.js",revision:"a2174051d0d12d18"},{url:"/_next/static/chunks/8957.2425311b5dc3837a.js",revision:"2425311b5dc3837a"},{url:"/_next/static/chunks/9417.1d3e3154da939c70.js",revision:"1d3e3154da939c70"},{url:"/_next/static/chunks/9603-5e9500e5d1a6663b.js",revision:"5e9500e5d1a6663b"},{url:"/_next/static/chunks/9763.f2af0b1db99341d7.js",revision:"f2af0b1db99341d7"},{url:"/_next/static/chunks/9847.b86b15dcd2283466.js",revision:"b86b15dcd2283466"},{url:"/_next/static/chunks/9877.53463d8abbc9c7f1.js",revision:"53463d8abbc9c7f1"},{url:"/_next/static/chunks/c16184b3-0c11553d30769a96.js",revision:"0c11553d30769a96"},{url:"/_next/static/chunks/framework-a2363dd3c3dbe572.js",revision:"a2363dd3c3dbe572"},{url:"/_next/static/chunks/main-14031c6d4e3ea10d.js",revision:"14031c6d4e3ea10d"},{url:"/_next/static/chunks/pages/%5B...pageUri%5D-a42fdb2c93e933a1.js",revision:"a42fdb2c93e933a1"},{url:"/_next/static/chunks/pages/%5BpostSlug%5D-fc8d874ff80abe2a.js",revision:"fc8d874ff80abe2a"},{url:"/_next/static/chunks/pages/%5BpostSlug%5D/%5BpostCursor%5D-1954edd73f625d6d.js",revision:"1954edd73f625d6d"},{url:"/_next/static/chunks/pages/404-06066e1c3443d307.js",revision:"06066e1c3443d307"},{url:"/_next/static/chunks/pages/_app-966d18722d8d11c7.js",revision:"966d18722d8d11c7"},{url:"/_next/static/chunks/pages/_error-50a37a311765a777.js",revision:"50a37a311765a777"},{url:"/_next/static/chunks/pages/aaa-mortgage-in-bc-d6bf91b05aea29ac.js",revision:"d6bf91b05aea29ac"},{url:"/_next/static/chunks/pages/apply-now-3a9b35acfbf7fb6e.js",revision:"3a9b35acfbf7fb6e"},{url:"/_next/static/chunks/pages/b-lender-bc-mortgage-8f67ee39ff6fda36.js",revision:"8f67ee39ff6fda36"},{url:"/_next/static/chunks/pages/blog-d39fb6edf3bb54e1.js",revision:"d39fb6edf3bb54e1"},{url:"/_next/static/chunks/pages/blogs-d0193cf08dbecfd0.js",revision:"d0193cf08dbecfd0"},{url:"/_next/static/chunks/pages/blogs/%5BpostSlug%5D-fb9ba367b380dbec.js",revision:"fb9ba367b380dbec"},{url:"/_next/static/chunks/pages/blogs/%5BpostSlug%5D/%5BpostCursor%5D-3e3618d3e18a858e.js",revision:"3e3618d3e18a858e"},{url:"/_next/static/chunks/pages/borrow-down-payment-services-bd993468fd165f1d.js",revision:"bd993468fd165f1d"},{url:"/_next/static/chunks/pages/category/%5BcategorySlug%5D-7e6a5db673f80a21.js",revision:"7e6a5db673f80a21"},{url:"/_next/static/chunks/pages/category/%5BcategorySlug%5D/%5BpaginationTerm%5D/%5BcategoryCursor%5D-3532b1415e061264.js",revision:"3532b1415e061264"},{url:"/_next/static/chunks/pages/commercial-mortgage-in-bc-c316e335f9ea67f2.js",revision:"c316e335f9ea67f2"},{url:"/_next/static/chunks/pages/commercial-mortgage-in-surrey-3b6c66f90b4538ba.js",revision:"3b6c66f90b4538ba"},{url:"/_next/static/chunks/pages/commercial-mortgage-in-vancouver-7dc745403f5e0db0.js",revision:"7dc745403f5e0db0"},{url:"/_next/static/chunks/pages/construction-financing-a15f36eca52618fe.js",revision:"a15f36eca52618fe"},{url:"/_next/static/chunks/pages/contact-us-2193ad098fdf2975.js",revision:"2193ad098fdf2975"},{url:"/_next/static/chunks/pages/current-rates-2d87abf2b85a8a85.js",revision:"2d87abf2b85a8a85"},{url:"/_next/static/chunks/pages/financing-for-business-in-bc-416c0a1f715b3ce6.js",revision:"416c0a1f715b3ce6"},{url:"/_next/static/chunks/pages/how-it-works-b6b6a182b09f23e7.js",revision:"b6b6a182b09f23e7"},{url:"/_next/static/chunks/pages/how-to-apply-ade9ab31d2fbe2be.js",revision:"ade9ab31d2fbe2be"},{url:"/_next/static/chunks/pages/index-531f1f91e6c0a53e.js",revision:"531f1f91e6c0a53e"},{url:"/_next/static/chunks/pages/langley-mortgage-broker-0848674e9bd9cf72.js",revision:"0848674e9bd9cf72"},{url:"/_next/static/chunks/pages/location-sitemap.xml-88403ed5f2c7ff6c.js",revision:"88403ed5f2c7ff6c"},{url:"/_next/static/chunks/pages/mortgage-broker-in-abbotsford-509af95fe56d9bf4.js",revision:"509af95fe56d9bf4"},{url:"/_next/static/chunks/pages/mortgage-broker-in-coquitlam-02edf1a3c16a13a2.js",revision:"02edf1a3c16a13a2"},{url:"/_next/static/chunks/pages/mortgage-broker-in-vancouver-ad953352d15ca7a4.js",revision:"ad953352d15ca7a4"},{url:"/_next/static/chunks/pages/mortgage-brokers-in-delta-3fb07d261e7265d7.js",revision:"3fb07d261e7265d7"},{url:"/_next/static/chunks/pages/mortgage-brokers-in-kamloops-b31da32609ca7635.js",revision:"b31da32609ca7635"},{url:"/_next/static/chunks/pages/mortgage-brokers-in-kelowna-ef8b2c8d41083cbe.js",revision:"ef8b2c8d41083cbe"},{url:"/_next/static/chunks/pages/mortgage-brokers-in-maple-ridge-6027510ad82207e2.js",revision:"6027510ad82207e2"},{url:"/_next/static/chunks/pages/mortgage-brokers-in-prince-george-7694703b8816c63d.js",revision:"7694703b8816c63d"},{url:"/_next/static/chunks/pages/mortgage-calculator-325b0557ee609ffb.js",revision:"325b0557ee609ffb"},{url:"/_next/static/chunks/pages/mortgage-for-self-employed-c2f834508e00d6b7.js",revision:"c2f834508e00d6b7"},{url:"/_next/static/chunks/pages/mortgage-refinance-calculator-bc-634fc09afb411fce.js",revision:"634fc09afb411fce"},{url:"/_next/static/chunks/pages/new-borrow-down-payment-in-bc-a500e6e23af9d8d5.js",revision:"a500e6e23af9d8d5"},{url:"/_next/static/chunks/pages/new-commercial-mortgage-in-vancouver-35ee0e9c88ddc81f.js",revision:"35ee0e9c88ddc81f"},{url:"/_next/static/chunks/pages/new-dominion-lending-mortgage-rates-6608bc00d0fce8cb.js",revision:"6608bc00d0fce8cb"},{url:"/_next/static/chunks/pages/old-home-96aebf9804d55ffb.js",revision:"96aebf9804d55ffb"},{url:"/_next/static/chunks/pages/our-locations-01611a0c6fea69c7.js",revision:"01611a0c6fea69c7"},{url:"/_next/static/chunks/pages/our-services-7835a3e3a47eeb16.js",revision:"7835a3e3a47eeb16"},{url:"/_next/static/chunks/pages/private-lenders-bc-fdd4e0caf2487d85.js",revision:"fdd4e0caf2487d85"},{url:"/_next/static/chunks/pages/server-sitemap.xml-841df76a23dbc685.js",revision:"841df76a23dbc685"},{url:"/_next/static/chunks/pages/testimonials-6fc4e98f41d8019d.js",revision:"6fc4e98f41d8019d"},{url:"/_next/static/chunks/pages/uninsured-mortgage-solutions-ffd4ebf8800f3af6.js",revision:"ffd4ebf8800f3af6"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-c7d4a2a5cbf44459.js",revision:"c7d4a2a5cbf44459"},{url:"/_next/static/css/09a6c8321e7bfbc2.css",revision:"09a6c8321e7bfbc2"},{url:"/_next/static/css/3015e103ccede76d.css",revision:"3015e103ccede76d"},{url:"/_next/static/css/4275c8e0a2f67f9f.css",revision:"4275c8e0a2f67f9f"},{url:"/_next/static/css/7571966fa44221de.css",revision:"7571966fa44221de"},{url:"/_next/static/css/aa40502706a12243.css",revision:"aa40502706a12243"},{url:"/_next/static/css/c9b1255ec7306d2b.css",revision:"c9b1255ec7306d2b"},{url:"/_next/static/css/dcdc98c82ce1d394.css",revision:"dcdc98c82ce1d394"},{url:"/_next/static/css/ed78465607e09bfb.css",revision:"ed78465607e09bfb"},{url:"/_next/static/media/AvenirLTStd-Black.8f8e7d37.otf",revision:"8f8e7d37"},{url:"/_next/static/media/AvenirLTStd-Book.a518a54c.otf",revision:"a518a54c"},{url:"/_next/static/media/AvenirLTStd-Roman.4f3c9a2f.otf",revision:"4f3c9a2f"},{url:"/_next/static/media/dejavu-sans.book.abe910e3.ttf",revision:"abe910e3"},{url:"/_next/static/media/revicons.652e7269.eot",revision:"652e7269"},{url:"/_next/static/media/revicons.b96bdb22.ttf",revision:"b96bdb22"},{url:"/_next/static/media/revicons.ff59b316.woff",revision:"ff59b316"},{url:"/_next/static/media/user.66608be2.png",revision:"ed5186c65f40b2861448490ed4f80eb5"},{url:"/android-chrome-192x192.png",revision:"67953bcdd35f58046408c43fbb06bf82"},{url:"/android-chrome-512x512.png",revision:"9d742295e5290356406ef754b07fe028"},{url:"/apple-touch-icon-114x114-precomposed.png",revision:"464b070e7c16fe8e1893fbc582dd2b93"},{url:"/apple-touch-icon-114x114.png",revision:"32cdde059a5e63b1906c19a936e35606"},{url:"/apple-touch-icon-120x120-precomposed.png",revision:"e52f7f9a1be83aeeb16eeff6d8a05b08"},{url:"/apple-touch-icon-120x120.png",revision:"762f13fbc0b24abdf4fcf603279f4137"},{url:"/apple-touch-icon-144x144-precomposed.png",revision:"a4e8e945a2073136704c5ab890a94e68"},{url:"/apple-touch-icon-144x144.png",revision:"6a83e2f31060ce310ce768ae4f1a3a61"},{url:"/apple-touch-icon-152x152-precomposed.png",revision:"d6f31edc96b4a61c1e4283ab137c1972"},{url:"/apple-touch-icon-152x152.png",revision:"12a68d863a69c4995419c7978c8a2edc"},{url:"/apple-touch-icon-180x180-precomposed.png",revision:"c25cebaf9adaac63becfc628c7555cd8"},{url:"/apple-touch-icon-180x180.png",revision:"9666bdbef5721f3105c1f7bfa11df949"},{url:"/apple-touch-icon-57x57-precomposed.png",revision:"8f09513b4f660e116067e945596f33d6"},{url:"/apple-touch-icon-57x57.png",revision:"e70f97d5fc84d2e9d04a91c51ac71ce1"},{url:"/apple-touch-icon-60x60-precomposed.png",revision:"0b8a8644a25a077613ab06ddc97f13b2"},{url:"/apple-touch-icon-60x60.png",revision:"1517d176ff562cb7d1136dfad79b8166"},{url:"/apple-touch-icon-72x72-precomposed.png",revision:"583615d28519fa101f5e236d0b668650"},{url:"/apple-touch-icon-72x72.png",revision:"51e654e5e2d0cfb8e6af10ac32412f44"},{url:"/apple-touch-icon-76x76-precomposed.png",revision:"7936deebcb11b871d33e7b933dcd2ab1"},{url:"/apple-touch-icon-76x76.png",revision:"9f8274db4513050152234a39f2b0af44"},{url:"/apple-touch-icon-precomposed.png",revision:"c25cebaf9adaac63becfc628c7555cd8"},{url:"/apple-touch-icon.png",revision:"9666bdbef5721f3105c1f7bfa11df949"},{url:"/browserconfig.xml",revision:"7acd068b21bab8b7b53881edf0cb0e0c"},{url:"/favicon 2.ico",revision:"c621cfb5e12cd78623132a3cc377ac0e"},{url:"/favicon-16x16.png",revision:"c1fee4c6448375f5122e69747ac57c07"},{url:"/favicon-32x32.png",revision:"21578385c7ec86c6bc450bd4197be17c"},{url:"/favicon.ico",revision:"7fee4edb228fc25cbaae22c56bc95751"},{url:"/favicon_package_v0.16/android-chrome-192x192.png",revision:"67953bcdd35f58046408c43fbb06bf82"},{url:"/favicon_package_v0.16/android-chrome-512x512.png",revision:"9d742295e5290356406ef754b07fe028"},{url:"/favicon_package_v0.16/apple-touch-icon-114x114-precomposed.png",revision:"464b070e7c16fe8e1893fbc582dd2b93"},{url:"/favicon_package_v0.16/apple-touch-icon-114x114.png",revision:"32cdde059a5e63b1906c19a936e35606"},{url:"/favicon_package_v0.16/apple-touch-icon-120x120-precomposed.png",revision:"e52f7f9a1be83aeeb16eeff6d8a05b08"},{url:"/favicon_package_v0.16/apple-touch-icon-120x120.png",revision:"762f13fbc0b24abdf4fcf603279f4137"},{url:"/favicon_package_v0.16/apple-touch-icon-144x144-precomposed.png",revision:"a4e8e945a2073136704c5ab890a94e68"},{url:"/favicon_package_v0.16/apple-touch-icon-144x144.png",revision:"6a83e2f31060ce310ce768ae4f1a3a61"},{url:"/favicon_package_v0.16/apple-touch-icon-152x152-precomposed.png",revision:"d6f31edc96b4a61c1e4283ab137c1972"},{url:"/favicon_package_v0.16/apple-touch-icon-152x152.png",revision:"12a68d863a69c4995419c7978c8a2edc"},{url:"/favicon_package_v0.16/apple-touch-icon-180x180-precomposed.png",revision:"c25cebaf9adaac63becfc628c7555cd8"},{url:"/favicon_package_v0.16/apple-touch-icon-180x180.png",revision:"9666bdbef5721f3105c1f7bfa11df949"},{url:"/favicon_package_v0.16/apple-touch-icon-57x57-precomposed.png",revision:"8f09513b4f660e116067e945596f33d6"},{url:"/favicon_package_v0.16/apple-touch-icon-57x57.png",revision:"e70f97d5fc84d2e9d04a91c51ac71ce1"},{url:"/favicon_package_v0.16/apple-touch-icon-60x60-precomposed.png",revision:"0b8a8644a25a077613ab06ddc97f13b2"},{url:"/favicon_package_v0.16/apple-touch-icon-60x60.png",revision:"1517d176ff562cb7d1136dfad79b8166"},{url:"/favicon_package_v0.16/apple-touch-icon-72x72-precomposed.png",revision:"583615d28519fa101f5e236d0b668650"},{url:"/favicon_package_v0.16/apple-touch-icon-72x72.png",revision:"51e654e5e2d0cfb8e6af10ac32412f44"},{url:"/favicon_package_v0.16/apple-touch-icon-76x76-precomposed.png",revision:"7936deebcb11b871d33e7b933dcd2ab1"},{url:"/favicon_package_v0.16/apple-touch-icon-76x76.png",revision:"9f8274db4513050152234a39f2b0af44"},{url:"/favicon_package_v0.16/apple-touch-icon-precomposed.png",revision:"c25cebaf9adaac63becfc628c7555cd8"},{url:"/favicon_package_v0.16/apple-touch-icon.png",revision:"9666bdbef5721f3105c1f7bfa11df949"},{url:"/favicon_package_v0.16/browserconfig.xml",revision:"7acd068b21bab8b7b53881edf0cb0e0c"},{url:"/favicon_package_v0.16/favicon-16x16.png",revision:"c1fee4c6448375f5122e69747ac57c07"},{url:"/favicon_package_v0.16/favicon-32x32.png",revision:"21578385c7ec86c6bc450bd4197be17c"},{url:"/favicon_package_v0.16/favicon.ico",revision:"7fee4edb228fc25cbaae22c56bc95751"},{url:"/favicon_package_v0.16/mstile-144x144.png",revision:"c0daa38f1a799fc76441051a5fe9ad1a"},{url:"/favicon_package_v0.16/mstile-150x150.png",revision:"f6d497907280ea4c38fbd17186f55a26"},{url:"/favicon_package_v0.16/mstile-310x150.png",revision:"d6aea9baa55bbe0a66b1b1d8e7e13bdb"},{url:"/favicon_package_v0.16/mstile-310x310.png",revision:"30dbb7006e17ffbba7e2a0658028f182"},{url:"/favicon_package_v0.16/mstile-70x70.png",revision:"74a95693822fc67a19260d86a8ea2a1c"},{url:"/favicon_package_v0.16/safari-pinned-tab.svg",revision:"9dce4bbb85146139692e6668cc547cbc"},{url:"/favicon_package_v0.16/site.webmanifest",revision:"ef613ed84913fc5727c9a5767b6c171c"},{url:"/fm-selection-1271373_09-44-06.zip",revision:"24d5c3a3d002b27f543e6b7e6cf0d1f4"},{url:"/home-banner.webp",revision:"9919cd0a53874a15dcf565460c49e258"},{url:"/icon-192x192.png",revision:"75cdbcb93505700e6083d79dbe05b0ea"},{url:"/icon-256x256.png",revision:"e6d2d6d1f5e85cf4152694508643cfad"},{url:"/icon-384x384.png",revision:"0754838f33fdb71c24f4f6975d760d2a"},{url:"/icon-512x512.png",revision:"032b30f0204781e881bc00ff0c657764"},{url:"/images/app.png",revision:"456052e05844d2250d85d524fabf739e"},{url:"/images/conquitlam-grid.png",revision:"7859c0ff6610e1e1d545ef53be71722d"},{url:"/images/layers.png",revision:"977c8dfbcfa69fcb85ce5bfde481dc8d"},{url:"/images/location-1.png",revision:"8a5028e7d412277469816b0405f4349f"},{url:"/images/location-10.png",revision:"5e18aa748951bff5dbaa7bbec820f770"},{url:"/images/location-2.png",revision:"5a1b9513cc11174c6a93ddd342b9903a"},{url:"/images/location-3.png",revision:"8906be627aea582bdf364f43680a0b52"},{url:"/images/location-4.png",revision:"0ed064fc136058c6d1caccef92e47b1c"},{url:"/images/location-5.png",revision:"4d7871f20a56f0532720d1be8b19e6ab"},{url:"/images/location-6.png",revision:"0130339dd92e7ec1ad5a33a65feec1de"},{url:"/images/location-7.png",revision:"ea6fb37d300ec2311b15d55453318d65"},{url:"/images/location-8.png",revision:"fb39e55dae7237057aac31d89fab5d7a"},{url:"/images/location-9.png",revision:"6dd9d6630e74b5d909e94f775edb0f0e"},{url:"/images/user.png",revision:"ed5186c65f40b2861448490ed4f80eb5"},{url:"/images/we-help-bg.png",revision:"74d6b414f099afb6710f2ac7aa83741e"},{url:"/images/we-help-bg.webp",revision:"0aa598e9a9855796f6ba70cb5cdf3341"},{url:"/manifest.json",revision:"44e6e2363dbf45426a6c5e7437470933"},{url:"/mortgage/CAMortgageLoan.js.download",revision:"36d78803222664857544d1dffb00fa49"},{url:"/mortgage/KJE.css",revision:"ca8cc6f4095afb2c77feebd62f125031"},{url:"/mortgage/KJE.js.download",revision:"70e6b890ecded29cc144d0817a07636d"},{url:"/mortgage/KJESiteSpecific.css",revision:"cbe33527da9be8632691f45626239d89"},{url:"/mortgage/KJESiteSpecific.js.download",revision:"8062dc03ba3f89860403a7acffb048ca"},{url:"/mortgage/Mortgage-Calculator.html",revision:"acabeacf25ac1756c8e0529ea5cd4d04"},{url:"/mstile-144x144.png",revision:"c0daa38f1a799fc76441051a5fe9ad1a"},{url:"/mstile-150x150.png",revision:"f6d497907280ea4c38fbd17186f55a26"},{url:"/mstile-310x150.png",revision:"d6aea9baa55bbe0a66b1b1d8e7e13bdb"},{url:"/mstile-310x310.png",revision:"30dbb7006e17ffbba7e2a0658028f182"},{url:"/mstile-70x70.png",revision:"74a95693822fc67a19260d86a8ea2a1c"},{url:"/robots.txt",revision:"ada35f91fb69f887a7568ad903b7da13"},{url:"/safari-pinned-tab.svg",revision:"9dce4bbb85146139692e6668cc547cbc"},{url:"/site.webmanifest",revision:"ef613ed84913fc5727c9a5767b6c171c"},{url:"/sitemap-0.xml",revision:"9049321791ea0fc936d76e459e998e02"},{url:"/sitemap.xml",revision:"f92bb81134142913e3defdef702d425c"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:c,event:a,state:s})=>c&&"opaqueredirect"===c.type?new Response(c.body,{status:200,statusText:"OK",headers:c.headers}):c}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const c=e.pathname;return!c.startsWith("/api/auth/")&&!!c.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));

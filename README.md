# RMOS Case Çalışması

Bu proje, RMOS firması için geliştirilmiş bir case çalışmasıdır. Fatura yönetimi ve kara liste işlemlerini içeren modern bir web uygulamasıdır.


## 📋 Özellikler

- **Kullanıcı Kimlik Doğrulama**: Güvenli giriş sistemi
- **Fatura Yönetimi**: Faturaları listeleme, filtreleme ve detay görüntüleme
- **Kara Liste Yönetimi**: Müşteri/tedarikçi kara liste operasyonları
- **Responsive Design**: Tüm cihazlarda uyumlu tasarım
- **Modern UI/UX**: Shadcn/ui ile geliştirilmiş kullanıcı dostu arayüz
- **Performance Optimizasyonu**: Virtual scrolling ve verimli render sistemi

## 🏗️ Proje Yapısı

```
rmos-case/
├── app/                        # Next.js App Router dosyaları
│   ├── faturalar/              # Fatura sayfaları
│   ├── kara-liste/             # Kara liste sayfaları
│   ├── login/                  # Giriş sayfası
│   ├── layout.tsx              # Ana layout
│   ├── page.tsx                # Ana sayfa (Dashboard)
│   └── providers.tsx           # Global provider'lar
├── components/                 # React bileşenleri
│   ├── ui/                     # Temel UI bileşenleri (Shadcn/ui)
│   ├── faturalar/              # Fatura ile ilgili bileşenler
│   ├── kara-liste/             # Kara liste ile ilgili bileşenler
│   └── login-form.tsx          # Giriş formu bileşeni
├── hooks/                      # Custom React hook'ları
├── services/                   # API servisleri
│   ├── authService.ts          # Kimlik doğrulama servisi
│   ├── invoices.ts             # Fatura servisleri
│   ├── blackListServices.ts    # Kara liste servisleri
│   └── toastService.ts         # Bildirim servisi
├── types/                      # TypeScript tip tanımları
│   ├── authTypes.ts            # Kimlik doğrulama tipleri
│   ├── invoicesTypes.ts        # Fatura tipleri
│   ├── blackListTypes.ts       # Kara liste tipleri
│   └── toastTypes.ts           # Bildirim tipleri
├── lib/                        # Yardımcı kütüphaneler
├── public/                     # Statik dosyalar
└── middleware.ts               # Next.js middleware
```

## 🛠️ Kullanılan Teknolojiler ve Paketler

### Ana Teknolojiler
- **Next.js 15.1.8**: React framework'ü (App Router)
- **React 19**: UI kütüphanesi
- **TypeScript 5**: Tip güvenliği
- **Tailwind CSS 3.4.1**: CSS framework'ü

### Önemli Paketler

#### UI ve Styling
- `@radix-ui/*`: Erişilebilir UI primitifleri
- `shadcn/ui`: Modern UI bileşen kütüphanesi
- `lucide-react`: İkon kütüphanesi
- `tailwindcss-animate`: CSS animasyonları
- `class-variance-authority`: Koşullu CSS sınıfları

#### State Management ve Data Fetching
- `zustand`: Hafif state management
- `@tanstack/react-query`: Server state management
- `axios`: HTTP istekleri

#### Form Yönetimi
- `react-hook-form`: Form yönetimi
- `@hookform/resolvers`: Form validasyon entegrasyonu
- `zod`: Schema validasyon

#### Performance ve UI Enhancement
- `react-window`: Virtual scrolling
- `react-window-infinite-loader`: Sonsuz scroll
- `recharts`: Grafik ve chart'lar
- `date-fns`: Tarih işlemleri

#### Diğer Yardımcı Paketler
- `js-cookie`: Cookie yönetimi
- `clsx`: Koşullu CSS sınıfları
- `tailwind-merge`: Tailwind sınıf birleştirme

### Dev Dependencies
- `eslint`: Kod kalitesi
- `@next/bundle-analyzer`: Bundle analizi
- `@types/*`: TypeScript tip tanımları

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 18+ 
- npm, yarn, pnpm veya bun

### Kurulum Adımları

1. **Projeyi klonlayın:**
```bash
git clone <repo-url>
cd rmos-case
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
# veya
yarn install
# veya
pnpm install
```

3. **Environment değişkenlerini ayarlayın:**
```bash
cp .env
# .env dosyasını düzenleyin
```

4. **Development sunucusunu başlatın:**
```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
```

5. **Tarayıcıda açın:**
[http://localhost:3000](http://localhost:3000)

## 🔧 Mevcut Komutlar

```bash
# Development sunucusu (Turbopack ile)
npm run dev

# Production build
npm run build

# Production sunucusu
npm run start

# Linting
npm run lint

# Bundle analizi
npm run analyze
```

## 🏗️ Build ve Deployment

### Production Build
```bash
npm run build
```

### Bundle Analizi
Uygulama boyutunu analiz etmek için:
```bash
npm run analyze
```

### Performance Optimizasyonu
- Virtual scrolling kullanılarak büyük listeler optimize edilmiştir
- Next.js Image component'i ile görsel optimizasyonu
- Bundle splitting ve lazy loading uygulanmıştır
- Detaylar için `PERFORMANCE.md` dosyasına bakınız

## 🔐 Güvenlik

- JWT tabanlı kimlik doğrulama
- Middleware ile route koruması
- XSS ve CSRF koruması
- Environment değişkenleri ile hassas veriler

## 📱 Responsive Design

Uygulama, tüm ekran boyutlarında optimize edilmiştir:
- Mobil: 320px+
- Tablet: 768px+
- Desktop: 1024px+

## 🧪 Çalışma Notları

Bu proje, aşağıdaki teknik becerileri göstermek amacıyla geliştirilmiştir:

- Modern React development patterns
- TypeScript kullanımı
- Performance optimization
- Responsive design
- Clean code principles
- API integration
- State management
- Form handling
- Error handling


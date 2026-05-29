import { useState } from 'react'

import './App.css'

type JourneyStep = {
  agency: string
  title: string
  description: string
  status: 'Selesai' | 'Dalam Semakan' | 'Tindakan Ibu Bapa' | 'Opsyen'
}

type Immunisation = {
  age: string
  vaccine: string
  dueDate: string
  status: 'Dijadualkan' | 'Perlu Tempah'
}

type DocumentItem = {
  title: string
  issuer: string
  detail: string
  status: string
  tone: 'success' | 'warning' | 'action' | 'neutral'
}

type TimelineEvent = {
  time: string
  title: string
  detail: string
  agency: string
  tone: 'success' | 'warning' | 'action' | 'neutral'
}

type ConsentRecord = {
  agency: string
  purpose: string
  dataShared: string
  status: string
  lastAccess: string
  tone: 'success' | 'warning' | 'action' | 'neutral'
}

type NotificationItem = {
  channel: string
  title: string
  detail: string
  time: string
  tone: 'success' | 'warning' | 'action' | 'neutral'
}

type ModuleItem = {
  code: string
  title: string
  agency: string
  description: string
}

const objektif: string[] = [
  'Memudahkan ibu bapa melengkapkan urusan kelahiran anak melalui satu saluran digital yang selamat, mudah dan bersepadu.',
  'Mengurangkan pengisian maklumat berulang melalui prinsip once-only dan integrasi data rentas agensi.',
  'Mempercepat penyampaian perkhidmatan kerajaan berkaitan kelahiran, kesihatan, bantuan dan perancangan awal anak.',
]

const manfaat: { audience: string; tagline: string; detail: string }[] = [
  {
    audience: 'Kepada Rakyat',
    tagline: 'Urusan lebih cepat & tersusun',
    detail:
      'Ibu bapa dapat menyelesaikan urusan kelahiran anak dengan lebih cepat dan tersusun tanpa perlu hadir berulang kali ke kaunter atau mengisi maklumat yang sama di pelbagai agensi.',
  },
  {
    audience: 'Kepada Kerajaan',
    tagline: 'Penyampaian lebih cekap & proaktif',
    detail:
      'Meningkatkan kecekapan penyampaian perkhidmatan, memperkukuh integrasi data rentas agensi dan membolehkan kerajaan menyediakan perkhidmatan yang lebih proaktif sepanjang kitaran hidup rakyat.',
  },
]

const modules: ModuleItem[] = [
  {
    code: '01',
    title: 'Prapendaftaran & Pengesahan Kelahiran',
    agency: 'KKM',
    description:
      'Rekod kelahiran diterima terus daripada sistem hospital dan dipadankan dengan profil ibu bapa.',
  },
  {
    code: '02',
    title: 'Pendaftaran Nama & Sijil Kelahiran Digital',
    agency: 'JPN',
    description:
      'Semakan nama automatik dan penjanaan e-Sijil Kelahiran terus ke peti dokumen digital.',
  },
  {
    code: '03',
    title: 'Penjanaan MyKid',
    agency: 'JPN',
    description: 'Nombor MyKid dijana automatik sebaik sahaja nama anak diluluskan oleh JPN.',
  },
  {
    code: '04',
    title: 'Semakan Kelayakan Bantuan Kelahiran',
    agency: 'LHDN / PADU',
    description:
      'Kelayakan bantuan dinilai automatik menggunakan data pendapatan isi rumah yang telah disahkan.',
  },
  {
    code: '05',
    title: 'Pembukaan Akaun Simpanan Anak',
    agency: 'PTPTN / KWSP',
    description:
      'Pilihan membuka akaun SSPN Prime atau caruman simpanan masa depan dengan persetujuan ibu bapa.',
  },
  {
    code: '06',
    title: 'Rekod Imunisasi & Janji Temu Kesihatan',
    agency: 'KKM',
    description: 'Jadual vaksin dijana automatik berdasarkan tarikh lahir dan klinik pilihan.',
  },
  {
    code: '07',
    title: 'Notifikasi Perkhidmatan Anak',
    agency: 'MyGov',
    description:
      'Peringatan proaktif merentas Push, SMS dan WhatsApp sepanjang kitaran hidup anak.',
  },
]

const features: string[] = [
  'Log masuk selamat melalui identiti digital',
  'Auto-populate maklumat ibu bapa',
  'Integrasi dengan JPN, KKM, LHDN, PADU, PTPTN dan KWSP',
  'Notifikasi proaktif kepada ibu bapa',
  'Semakan kelayakan bantuan secara automatik',
  'Rekod digital anak yang boleh dikembangkan untuk fasa persekolahan dan perkhidmatan masa depan',
]

const strategicValues: string[] = [
  'Berimpak kepada rakyat',
  'Integrasi rentas agensi',
  'Berpandukan data',
  'Proaktif & selamat',
]

const journeySteps: JourneyStep[] = [
  {
    agency: 'KKM',
    title: 'Rekod kelahiran disahkan hospital',
    description:
      'Data kelahiran diterima terus daripada sistem hospital dan dipadankan dengan profil ibu bapa.',
    status: 'Selesai',
  },
  {
    agency: 'JPN',
    title: 'Pendaftaran nama dan e-Sijil Kelahiran',
    description:
      'Semakan nama automatik, jana Nombor MyKid, dan simpan e-Sijil Kelahiran dalam peti dokumen digital.',
    status: 'Tindakan Ibu Bapa',
  },
  {
    agency: 'MOF / LHDN / PADU',
    title: 'Penilaian bantuan kelahiran bersasar',
    description:
      'Kelayakan dinilai menggunakan data pendapatan isi rumah dan akaun bank yang telah disahkan.',
    status: 'Dalam Semakan',
  },
  {
    agency: 'PTPTN / KWSP',
    title: 'Pembukaan akaun simpanan masa depan',
    description:
      'Ibu bapa boleh memberi persetujuan untuk membuka akaun SSPN Prime atau caruman pihak ketiga.',
    status: 'Opsyen',
  },
  {
    agency: 'KKM',
    title: 'Jadual imunisasi dan janji temu klinik',
    description:
      'Kalendar vaksin bayi dijana automatik berdasarkan tarikh lahir dan lokasi klinik pilihan.',
    status: 'Dalam Semakan',
  },
]

const agencies = ['KKM', 'JPN', 'MyDigital ID', 'LHDN', 'PADU', 'PTPTN', 'KWSP']

const documents: DocumentItem[] = [
  {
    title: 'e-Sijil Kelahiran',
    issuer: 'JPN',
    detail: 'Akan dijana selepas nama anak diluluskan.',
    status: 'Menunggu kelulusan',
    tone: 'warning',
  },
  {
    title: 'Nombor MyKid',
    issuer: 'JPN',
    detail: 'Nombor sementara telah disediakan untuk semakan.',
    status: 'Dalam proses',
    tone: 'action',
  },
  {
    title: 'Pengesahan Kelahiran Hospital',
    issuer: 'KKM',
    detail: 'Disahkan oleh Hospital Putrajaya pada 25 Mei 2026.',
    status: 'Sedia dimuat turun',
    tone: 'success',
  },
  {
    title: 'Resit Permohonan Digital',
    issuer: 'MyAnak',
    detail: 'Rujukan permohonan: MYA-2026-0525-0018.',
    status: 'Tersimpan',
    tone: 'neutral',
  },
]

const timelineEvents: TimelineEvent[] = [
  {
    time: '8:42 pagi',
    title: 'Kelahiran direkodkan',
    detail: 'Hospital menghantar rekod kelahiran bayi ke gerbang MyAnak.',
    agency: 'KKM',
    tone: 'success',
  },
  {
    time: '9:05 pagi',
    title: 'Identiti ibu bapa dipadankan',
    detail: 'Profil ibu bapa disahkan melalui MyDigital ID dan data JPN.',
    agency: 'MyDigital ID',
    tone: 'success',
  },
  {
    time: 'Sekarang',
    title: 'Nama anak diperlukan',
    detail: 'Ibu bapa perlu lengkapkan nama untuk semakan automatik JPN.',
    agency: 'JPN',
    tone: 'action',
  },
  {
    time: 'Seterusnya',
    title: 'Bantuan dan simpanan diproses',
    detail: 'Kelayakan bantuan, akaun simpanan dan jadual imunisasi akan diaktifkan.',
    agency: 'MOF / PTPTN / KKM',
    tone: 'warning',
  },
]

const immunisations: Immunisation[] = [
  {
    age: 'Lahir',
    vaccine: 'BCG, Hepatitis B dos 1',
    dueDate: '25 Mei 2026',
    status: 'Dijadualkan',
  },
  {
    age: '1 bulan',
    vaccine: 'Hepatitis B dos 2',
    dueDate: '25 Jun 2026',
    status: 'Perlu Tempah',
  },
  {
    age: '2 bulan',
    vaccine: 'DTaP-IPV-Hib, Pneumokokal dos 1',
    dueDate: '25 Julai 2026',
    status: 'Perlu Tempah',
  },
]

const statusClassMap: Record<JourneyStep['status'] | Immunisation['status'], string> = {
  Selesai: 'success',
  'Dalam Semakan': 'warning',
  'Tindakan Ibu Bapa': 'action',
  Opsyen: 'neutral',
  Dijadualkan: 'success',
  'Perlu Tempah': 'action',
}

const consentRecords: ConsentRecord[] = [
  {
    agency: 'JPN',
    purpose: 'Menjana e-Sijil Kelahiran dan Nombor MyKid.',
    dataShared: 'Nama anak, data kelahiran, maklumat ibu bapa',
    status: 'Aktif',
    lastAccess: '25 Mei 2026, 9:08 pagi',
    tone: 'success',
  },
  {
    agency: 'LHDN / PADU',
    purpose: 'Menyemak kelayakan bantuan kelahiran bersasar.',
    dataShared: 'Julat pendapatan isi rumah, status tanggungan',
    status: 'Semakan minimum',
    lastAccess: '25 Mei 2026, 9:10 pagi',
    tone: 'action',
  },
  {
    agency: 'PTPTN / KWSP',
    purpose: 'Membuka akaun simpanan anak selepas ibu bapa memberi persetujuan.',
    dataShared: 'Belum dihantar',
    status: 'Menunggu persetujuan',
    lastAccess: 'Tiada akses lagi',
    tone: 'warning',
  },
]

const notifications: NotificationItem[] = [
  {
    channel: 'Push App',
    title: 'Lengkapkan nama anak',
    detail: 'Permohonan JPN boleh diproses selepas nama anak disahkan.',
    time: 'Sekarang',
    tone: 'action',
  },
  {
    channel: 'SMS',
    title: 'Rekod hospital diterima',
    detail: 'Pengesahan kelahiran daripada KKM berjaya dipadankan.',
    time: '9:00 pagi',
    tone: 'success',
  },
  {
    channel: 'WhatsApp',
    title: 'Peringatan imunisasi',
    detail: 'Tempahan vaksin satu bulan akan dibuka selepas e-Sijil diluluskan.',
    time: 'Dijadualkan',
    tone: 'neutral',
  },
]

function App() {
  const [childName, setChildName] = useState('Aisyah Damia')
  const [isNameSubmitted, setIsNameSubmitted] = useState(false)
  const [selectedSaving, setSelectedSaving] = useState('SSPN Prime')
  const [consentGiven, setConsentGiven] = useState(false)

  const completedSteps = journeySteps.filter((step) => step.status === 'Selesai').length
  const progressPercentage = Math.round((completedSteps / journeySteps.length) * 100)
  const trimmedChildName = childName.trim()

  return (
    <main className="app-shell">
      <section className="hero-section">
        <nav className="topbar" aria-label="Navigasi utama">
          <a className="brand" href="#overview" aria-label="MyAnak halaman utama">
            <span className="brand-mark">MA</span>
            <span>MyAnak</span>
          </a>
          <div className="nav-actions">
            <a href="#tujuan">Tujuan</a>
            <a href="#modul">Modul</a>
            <a href="#pendaftaran">Pendaftaran</a>
            <a href="#ciri">Ciri-Ciri</a>
            <button type="button">Log masuk MyDigital ID</button>
          </div>
        </nav>

        <div className="hero-grid" id="overview">
          <div className="hero-copy">
            <p className="eyebrow">Inisiatif 1 &middot; Portal Pendaftaran & Pengurusan Kelahiran Anak Setempat</p>
            <h1>Daftar kelahiran anak sekali, gerakkan semua perkhidmatan kerajaan.</h1>
            <p className="hero-description">
              Satu saluran digital bersepadu untuk urusan kelahiran anak secara
              mudah, selamat dan proaktif &mdash; menyatukan KKM, JPN, LHDN, PADU,
              PTPTN dan KWSP dalam satu journey melalui ekosistem MyGov.
            </p>

            <div className="hero-actions">
              <a href="#pendaftaran" className="primary-action">
                Lengkapkan pendaftaran
              </a>
              <a href="#modul" className="secondary-action">
                Lihat modul MyAnak
              </a>
            </div>
          </div>

          <aside className="status-card" aria-label="Ringkasan status kelahiran">
            <div className="notification-card">
              <p className="card-label">Notifikasi KKM</p>
              <h2>Tahniah, rekod kelahiran telah disahkan.</h2>
              <p>
                Hospital Putrajaya mengesahkan kelahiran bayi pada 25 Mei 2026,
                8:42 pagi. Sila lengkapkan nama anak untuk jana MyKid.
              </p>
            </div>
            <div className="progress-summary">
              <span>{progressPercentage}%</span>
              <div>
                <strong>{completedSteps} daripada {journeySteps.length} langkah selesai</strong>
                <p>Data asas ibu bapa telah dipadankan melalui MyDigital ID.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="story-section" id="tujuan">
        <div className="section-heading centered">
          <p className="eyebrow">Tujuan & Objektif</p>
          <h2>Kenapa MyAnak perlu wujud?</h2>
          <p>
            MyAnak direka untuk mengubah pengalaman ibu bapa daripada proses
            berulang di banyak agensi kepada satu perjalanan digital yang proaktif,
            selamat dan berpusatkan rakyat.
          </p>
        </div>

        <div className="story-grid">
          <article className="story-card story-highlight">
            <span>Tujuan</span>
            <h3>Satu platform digital setempat untuk urusan kelahiran</h3>
            <p>
              Membangunkan satu platform digital setempat bagi menyelaras proses
              pendaftaran kelahiran, pengesahan rekod kesihatan bayi, pendaftaran
              nama, penjanaan MyKid, semakan bantuan berkaitan kelahiran serta
              perancangan perkhidmatan anak secara bersepadu melalui ekosistem MyGov.
            </p>
          </article>

          <article className="story-card">
            <span>Objektif</span>
            <ol className="numbered-list">
              {objektif.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </article>
        </div>
      </section>

      <section className="benefit-section" id="manfaat">
        <div className="section-heading centered">
          <p className="eyebrow">Manfaat</p>
          <h2>Impak kepada rakyat dan kerajaan</h2>
          <p>
            MyAnak memberi nilai dua hala &mdash; memudahkan urusan ibu bapa dan
            meningkatkan kecekapan penyampaian perkhidmatan kerajaan.
          </p>
        </div>

        <div className="benefit-cards">
          {manfaat.map((item) => (
            <article className="manfaat-card" key={item.audience}>
              <div className="manfaat-head">
                <span className="manfaat-audience">{item.audience}</span>
                <strong>{item.tagline}</strong>
              </div>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="modules-section" id="modul">
        <div className="section-heading centered">
          <p className="eyebrow">Modul-Modul</p>
          <h2>Tujuh modul, satu pengalaman bersepadu</h2>
          <p>
            Setiap modul menggunakan prinsip once-only: data yang sudah disahkan
            tidak diminta semula daripada ibu bapa.
          </p>
        </div>

        <div className="modules-grid">
          {modules.map((module) => (
            <article className="module-card" key={module.code}>
              <div className="module-top">
                <span className="module-code">{module.code}</span>
                <span className="module-agency">{module.agency}</span>
              </div>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-grid" id="pendaftaran">
        <div className="panel registration-panel">
          <div className="section-heading">
            <p className="eyebrow">Modul 02 &middot; Tindakan Ibu Bapa</p>
            <h2>Pendaftaran nama anak</h2>
            <p>
              Maklumat ibu bapa dan data kelahiran telah diisi automatik. Masukkan
              nama anak untuk semakan JPN.
            </p>
          </div>

          <label className="field">
            <span>Nama anak</span>
            <input
              value={childName}
              onChange={(event) => {
                setChildName(event.target.value)
                setIsNameSubmitted(false)
              }}
              placeholder="Contoh: Aisyah Damia"
            />
          </label>

          <div className="autofill-grid" aria-label="Maklumat diisi automatik">
            <div>
              <span>Ibu</span>
              <strong>Nur Farah binti Azman</strong>
            </div>
            <div>
              <span>Bapa</span>
              <strong>Ahmad Hakimi bin Roslan</strong>
            </div>
            <div>
              <span>Lokasi lahir</span>
              <strong>Hospital Putrajaya</strong>
            </div>
            <div>
              <span>MyKid sementara</span>
              <strong>260525-14-0001</strong>
            </div>
          </div>

          <div className="approval-strip">
            <span className="status-dot" />
            <p>
              Nama <strong>{trimmedChildName || 'belum diisi'}</strong> akan disemak oleh
              enjin peraturan JPN sebelum e-Sijil Kelahiran dijana.
            </p>
          </div>

          <div className="registration-actions">
            <button
              type="button"
              className="submit-registration"
              disabled={!trimmedChildName}
              onClick={() => setIsNameSubmitted(true)}
            >
              Hantar untuk Semakan JPN
            </button>
            <p className={isNameSubmitted ? 'submission-status success' : 'submission-status'}>
              {isNameSubmitted
                ? `Permohonan nama ${trimmedChildName} telah dihantar untuk semakan JPN.`
                : 'Pastikan ejaan nama anak betul sebelum dihantar.'}
            </p>
          </div>
        </div>

        <div className="panel benefit-panel">
          <div className="section-heading">
            <p className="eyebrow">Modul 04 &middot; Bantuan Proaktif</p>
            <h2>Kelayakan insentif kelahiran</h2>
          </div>
          <div className="benefit-amount">
            <span>Anggaran bantuan diluluskan</span>
            <strong>RM500</strong>
          </div>
          <ul className="check-list">
            <li>Pendapatan isi rumah disahkan melalui LHDN dan PADU.</li>
            <li>Akaun bank ibu bapa telah dipadankan dengan rekod eKYC.</li>
            <li>Bayaran akan dikreditkan selepas JPN meluluskan pendaftaran.</li>
          </ul>
        </div>
      </section>

      <section className="journey-section" id="journey">
        <div className="section-heading centered">
          <p className="eyebrow">End-to-End Journey</p>
          <h2>Satu rekod, banyak perkhidmatan</h2>
          <p>
            Setiap langkah menggunakan prinsip once-only: data yang sudah disahkan
            tidak diminta semula daripada ibu bapa.
          </p>
        </div>

        <div className="journey-list">
          {journeySteps.map((step, index) => (
            <article className="journey-card" key={step.title}>
              <div className="step-index">{String(index + 1).padStart(2, '0')}</div>
              <div>
                <div className="card-header">
                  <span>{step.agency}</span>
                  <span className={`status-pill ${statusClassMap[step.status]}`}>
                    {step.status}
                  </span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="insight-section" id="dokumen">
        <div className="section-heading centered">
          <p className="eyebrow">Modul 02 & 03 &middot; Dokumen Digital</p>
          <h2>Dokumen dan timeline permohonan</h2>
          <p>
            Ibu bapa boleh melihat dokumen yang telah dijana, status semakan, dan
            langkah seterusnya tanpa menghubungi pelbagai kaunter.
          </p>
        </div>

        <div className="insight-grid">
          <div className="panel document-panel">
            <div className="panel-heading">
              <h3>Peti dokumen digital</h3>
              <span>4 dokumen</span>
            </div>
            <div className="document-list">
              {documents.map((document) => (
                <article className="document-card" key={document.title}>
                  <div className="document-icon">{document.issuer.slice(0, 2)}</div>
                  <div>
                    <div className="card-header">
                      <span>{document.issuer}</span>
                      <span className={`status-pill ${document.tone}`}>{document.status}</span>
                    </div>
                    <h4>{document.title}</h4>
                    <p>{document.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="panel timeline-panel">
            <div className="panel-heading">
              <h3>Timeline permohonan</h3>
              <span>Hari ini</span>
            </div>
            <div className="timeline-list">
              {timelineEvents.map((event) => (
                <article className="timeline-item" key={`${event.time}-${event.title}`}>
                  <span className={`timeline-dot ${event.tone}`} />
                  <div>
                    <div className="timeline-meta">
                      <strong>{event.time}</strong>
                      <span>{event.agency}</span>
                    </div>
                    <h4>{event.title}</h4>
                    <p>{event.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-grid" id="integrasi">
        <div className="panel integration-panel">
          <div className="section-heading">
            <p className="eyebrow">Lapisan Integrasi</p>
            <h2>Agensi terhubung melalui gerbang API selamat</h2>
            <p>
              MyAnak bertindak sebagai orkestrator. Setiap agensi mengekalkan
              sistem sumber masing-masing, manakala portal menyelaras consent,
              audit trail dan status permohonan.
            </p>
          </div>

          <div className="agency-cloud">
            {agencies.map((agency) => (
              <span key={agency}>{agency}</span>
            ))}
          </div>
        </div>

        <div className="panel savings-panel">
          <div className="section-heading">
            <p className="eyebrow">Modul 05 &middot; Simpanan Masa Depan</p>
            <h2>Pilih akaun untuk anak</h2>
          </div>

          <div className="option-group" role="radiogroup" aria-label="Pilihan simpanan">
            {['SSPN Prime', 'KWSP pihak ketiga'].map((option) => (
              <button
                className={selectedSaving === option ? 'selected' : ''}
                type="button"
                key={option}
                onClick={() => setSelectedSaving(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <label className="consent-box">
            <input
              type="checkbox"
              checked={consentGiven}
              onChange={(event) => setConsentGiven(event.target.checked)}
            />
            <span>
              Saya bersetuju data anak dihantar kepada {selectedSaving} untuk
              pembukaan akaun.
            </span>
          </label>

          <div className="consent-result">
            {consentGiven
              ? `Permohonan ${selectedSaving} sedia dihantar selepas e-Sijil diluluskan.`
              : 'Tandakan persetujuan untuk aktifkan pembukaan akaun automatik.'}
          </div>
        </div>
      </section>

      <section className="section-grid operations-section">
        <div className="panel privacy-panel">
          <div className="section-heading">
            <p className="eyebrow">Consent & Privasi</p>
            <h2>Kawalan perkongsian data</h2>
            <p>
              Setiap akses agensi direkodkan supaya ibu bapa tahu data apa yang
              dikongsi, untuk tujuan apa, dan bila ia digunakan.
            </p>
          </div>

          <div className="consent-records">
            {consentRecords.map((record) => (
              <article className="consent-record" key={record.agency}>
                <div className="card-header">
                  <span>{record.agency}</span>
                  <span className={`status-pill ${record.tone}`}>{record.status}</span>
                </div>
                <h4>{record.purpose}</h4>
                <dl>
                  <div>
                    <dt>Data</dt>
                    <dd>{record.dataShared}</dd>
                  </div>
                  <div>
                    <dt>Akses terakhir</dt>
                    <dd>{record.lastAccess}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>

        <div className="panel notification-panel">
          <div className="section-heading">
            <p className="eyebrow">Modul 07 &middot; Pusat Notifikasi</p>
            <h2>Peringatan proaktif</h2>
          </div>

          <div className="notification-list">
            {notifications.map((notification) => (
              <article className="notification-item" key={notification.title}>
                <span className={`notification-badge ${notification.tone}`}>
                  {notification.channel}
                </span>
                <h4>{notification.title}</h4>
                <p>{notification.detail}</p>
                <time>{notification.time}</time>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="immunisation-section" id="imunisasi">
        <div className="section-heading">
          <p className="eyebrow">Modul 06 &middot; Kesihatan Anak</p>
          <h2>Jadual imunisasi digital</h2>
          <p>
            Tarikh vaksin dijana daripada tarikh lahir dan boleh ditempah di klinik
            kesihatan berhampiran.
          </p>
        </div>

        <div className="immunisation-table" role="table" aria-label="Jadual imunisasi bayi">
          <div className="table-row table-head" role="row">
            <span>Umur</span>
            <span>Vaksin</span>
            <span>Tarikh cadangan</span>
            <span>Status</span>
          </div>
          {immunisations.map((item) => (
            <div className="table-row" role="row" key={`${item.age}-${item.vaccine}`}>
              <span>{item.age}</span>
              <span>{item.vaccine}</span>
              <span>{item.dueDate}</span>
              <span className={`status-pill ${statusClassMap[item.status]}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="features-section" id="ciri">
        <div className="section-heading centered">
          <p className="eyebrow">Ciri-Ciri Utama</p>
          <h2>Apa yang menggerakkan MyAnak</h2>
          <p>
            Enam ciri teras yang memastikan pengalaman pendaftaran kelahiran
            selamat, automatik dan boleh berkembang sepanjang hidup anak.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <article className="feature-card" key={feature}>
              <span className="feature-index">{String(index + 1).padStart(2, '0')}</span>
              <p>{feature}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="strategic-section" aria-label="Nilai strategik">
        <p className="eyebrow">Nilai Strategik</p>
        <div className="strategic-strip">
          {strategicValues.map((value) => (
            <span className="strategic-pill" key={value}>
              {value}
            </span>
          ))}
        </div>
      </section>

      <section className="future-section">
        <div>
          <p className="eyebrow">Future-Proofing</p>
          <h2>Portal yang mengikuti fasa hidup anak</h2>
          <p>
            Apabila anak mencapai usia tujuh tahun, MyAnak boleh menghantar
            notifikasi pendaftaran sekolah rendah, semakan alamat, dan penukaran
            Kad Pintar MyKid tanpa permohonan baharu.
          </p>
        </div>
        <button type="button">Aktifkan peringatan masa depan</button>
      </section>
    </main>
  )
}

export default App

export interface ProjectCategoryMeta {
  id: string
  count: string
}

export const projectCategories: ProjectCategoryMeta[] = [
  { id: 'education', count: '01' },
  { id: 'sante', count: '02' },
  { id: 'administratif', count: '03' },
  { id: 'culture-sports', count: '04' },
  { id: 'loisirs-tourisme', count: '05' },
  { id: 'logements', count: '06' },
  { id: 'industrie', count: '07' },
  { id: 'territoire', count: '08' },
  { id: 'international', count: '09' },
]

export interface TrustedClient {
  id: string
  file: string
  url?: string
  light?: boolean
}

export const trustedClients: TrustedClient[] = [
  { id: 'paul', file: 'paul.png', url: 'https://www.paul.fr/' },
  { id: 'attijari-bank', file: 'attijari.png', url: 'https://www.attijaribank.com.tn/' },
  { id: 'ministere-equipement', file: 'ministere-equipement-full.png', url: 'https://www.mehat.gov.tn/' },
  { id: 'aefe', file: 'aefe.png', url: 'https://www.aefe.gouv.fr/' },
  { id: 'office-tourisme', file: 'office-tourisme.png', url: 'https://www.discovertunisia.com/' },
  { id: 'poste-tunisienne', file: 'poste-tunisienne.png', url: 'https://www.poste.tn/' },
  { id: 'bt', file: 'bt.png', url: 'https://www.bt.com.tn/' },
  { id: 'zitouna-takaful', file: 'zitouna-takaful.png', url: 'https://zitounatakaful.com/fr' },
  { id: 'foire-sousse', file: 'foire-sousse.png', url: '' },
  { id: 'hopital-sahloul', file: 'hopital-sahloul.webp', url: 'http://hopitalsahloul.tn/' },
  { id: 'polyclinique-corniche', file: 'polyclinique-corniche.png', url: 'http://www.clinique-lacorniche.com/' },
  { id: 'centre-carthage-medical', file: 'centre-international-carthage-medical.webp', url: 'https://carthagemedical.com.tn/', },
  { id: 'essalem-clinic', file: 'logo-essalem-clinic.png', url: 'https://www.clinique-essalem.com/' },
  { id: 'leoni', file: 'leoni.png', url: 'https://www.leoni-tunisia.com/' },
  { id: 'movenpick', file: 'movenpick.svg', url: 'https://movenpick.accor.com/en/africa/tunisia.html' },
  { id: 'unimed', file: 'unimed.png', url: 'https://www.unimed.com.tn/' },
  { id: 'rosa-beach', file: 'rosa-beach.png', url: 'https://rosabeach.tn/fr-fr/' },
  { id: 'tej-marhaba', file: 'tej-marhaba.png', url: 'https://tejmarhaba.tn/' },
  { id: 'riviera-hotel', file: 'riviera_hotel.png', url: 'https://riviera.tn/' },
  { id: 'magic-hotels', file: 'Magic_Hotels_&_Resorts.jpg', url: 'https://www.magichotelsandresorts.com/' },
  { id: 'kaschke-components', file: 'kaschke_components_tunisie.jpeg', url: 'https://bourns.com/products/magnetic-products/kaschke-components/kaschke-capabilities' },
  { id: 'iffco', file: 'iffco.png', url: 'https://iffco.com/' },
  { id: 'ifrisol', file: 'ifrisol-logo.png', url: 'https://www.ifrisol.solar/' },
  { id: 'givi', file: 'givi-social.png', url: 'https://givi.it/' },
  { id: 'jomaa', file: 'jomaa.png', url: 'https://www.jomaa.tn/fr/' },
  { id: 'arco', file: 'arco.jpg', url: 'https://www.arco-sa.com/' },
  { id: 'sts', file: 'STS.png', url: 'https://www.ststn.com/' },
  { id: 'stp', file: 'stp.png', url: '' },
  { id: 'stts', file: 'stts.jpeg', url: 'https://www.stts.com.tn/' },
  { id: 'azurex', file: 'azurex_sarl.jpeg', url: 'https://www.azurex.com.tn/' },
  { id: 'cogeb', file: 'cogeb.png', url: 'https://cogebgroupe.com/' },
  { id: 'crc', file: 'crc.png', url: 'https://crc-groupe.com/en/' },
  { id: 'nesspri', file: 'nesspri.png', url: 'https://nesspri.com/' },
  { id: 'spiz', file: 'spiz.jpeg', url: 'https://www.spiz.tn/' },
  { id: 'bh-immo', file: 'bh-immo.png', url: 'http://www.bh-immo.tn/' },
  { id: 'zayatine', file: 'logo-zayatine-fr.jpg', url: 'https://www.cliniquelesoliviers.net/' },
]

export interface ProjectStat {
  value: number
  suffix: string
}

export const projectStats: ProjectStat[] = [
  { value: 200, suffix: '+' },
  { value: 25, suffix: '+' },
  { value: 9, suffix: '' },
]

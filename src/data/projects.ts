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
  // Santé
  { id: 'hopital-sahloul', file: 'hopital-sahloul.png', url: 'http://hopitalsahloul.tn/' },
  { id: 'polyclinique-corniche', file: 'polyclinique-corniche.png', url: 'http://www.clinique-lacorniche.com/' },
  { id: 'centre-carthage-medical', file: 'carthage-medical.png', url: 'https://carthagemedical.com.tn/' },
  { id: 'essalem-clinic', file: 'clinique-essalem.png', url: 'https://www.clinique-essalem.com/' },
  { id: 'chu-farhat-hached', file: 'chu-farhat-hached.png', url: '' },
  { id: 'zayatine', file: 'clinique-oliviers.png', url: 'https://www.cliniquelesoliviers.net/' },
  { id: 'unimed', file: 'unimed.png', url: 'https://www.unimed.com.tn/' },

  // Hôtellerie & Tourisme
  { id: 'movenpick', file: 'movenpick.png', url: 'https://movenpick.accor.com/en/africa/tunisia.html' },
  { id: 'rosa-beach', file: 'rosa-beach.png', url: 'https://rosabeach.tn/fr-fr/' },
  { id: 'tej-marhaba', file: 'tej-marhaba.png', url: 'https://tejmarhaba.tn/' },
  { id: 'riviera-hotel', file: 'riviera-hotel.png', url: 'https://riviera.tn/' },
  { id: 'magic-hotels', file: 'magic-hotels.png', url: 'https://www.magichotelsandresorts.com/' },
  { id: 'abou-sofiane', file: 'abou-sofiane-hotel.png', url: '' },
  { id: 'royal-thalassa-monastir', file: 'royal-thalassa-monastir.png', url: '' },
  { id: 'thalassa-mahdia', file: 'thalassa-mahdia.png', url: '' },
  { id: 'thalassa-sousse', file: 'thalassa-sousse.png', url: '' },
  { id: 'office-tourisme', file: 'office-tourisme.png', url: 'https://www.discovertunisia.com/' },
  { id: 'foire-sousse', file: 'foire-sousse.png', url: '' },

  // Banques, Finance & Assurance
  { id: 'attijari-bank', file: 'attijari.png', url: 'https://www.attijaribank.com.tn/' },
  { id: 'bt', file: 'bt.png', url: 'https://www.bt.com.tn/' },
  { id: 'zitouna-takaful', file: 'zitouna-takaful.png', url: 'https://zitounatakaful.com/fr' },
  { id: 'bh-immo', file: 'bh-immo.png', url: 'http://www.bh-immo.tn/' },

  // Institutions publiques & Éducation
  { id: 'ministere-equipement', file: 'ministere-equipement-full.png', url: 'https://www.mehat.gov.tn/' },
  { id: 'aefe', file: 'aefe.png', url: 'https://www.aefe.gouv.fr/' },
  { id: 'poste-tunisienne', file: 'poste-tunisienne.png', url: 'https://www.poste.tn/' },
  { id: 'eps-tahar-sfar', file: 'eps-tahar-sfar.png', url: '' },
  { id: 'fac-med-sousse', file: 'fac-med-sousse.png', url: '' },

  // Industrie
  { id: 'leoni', file: 'leoni.png', url: 'https://www.leoni-tunisia.com/' },
  { id: 'kaschke-components', file: 'kaschke_components_tunisie.jpeg', url: 'https://bourns.com/products/magnetic-products/kaschke-components/kaschke-capabilities' },
  { id: 'iffco', file: 'iffco.png', url: 'https://iffco.com/' },
  { id: 'ifrisol', file: 'ifrisol.png', url: 'https://www.ifrisol.solar/' },
  { id: 'givi', file: 'givi.png', url: 'https://givi.it/' },
  { id: 'arco', file: 'arco.png', url: 'https://www.arco-sa.com/' },
  { id: 'sts', file: 'sts.png', url: 'https://www.ststn.com/' },
  { id: 'stp', file: 'stp.png', url: '' },
  { id: 'stts', file: 'stts.png', url: 'https://www.stts.com.tn/' },
  { id: 'azurex', file: 'azurex.png', url: 'https://www.azurex.com.tn/' },
  { id: 'cogeb', file: 'cogeb.png', url: 'https://cogebgroupe.com/' },
  { id: 'crc', file: 'crc.png', url: 'https://crc-groupe.com/en/' },
  { id: 'nesspri', file: 'nesspri.png', url: 'https://nesspri.com/' },
  { id: 'spiz', file: 'spiz.png', url: 'https://www.spiz.tn/' },

  // Autres
  { id: 'paul', file: 'paul.png', url: 'https://www.paul.fr/' },
  { id: 'jomaa', file: 'jomaa.png', url: 'https://www.jomaa.tn/fr/' },
  { id: 'amine', file: 'amine.png', url: '' },
  { id: 'al-kanaouet', file: 'el-kanaouet.png', url: '' },
]
export interface ProjectStat {
  value: number
  suffix: string
}

export const projectStats: ProjectStat[] = [
  { value: 500, suffix: '+' },
  { value: 25, suffix: '+' },
  { value: 9, suffix: '' },
]

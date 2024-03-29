import { MENU } from './consts/menu'

export class Helpers {
  static allMenuItems (): {} {
    return MENU.reduce((l, i) => {
      l[i.label] = true
      return l
    }, {})
  }

  static getImage (blob: Blob, type: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const reader = new FileReader()
        reader.onload = () => {
          const result = reader.result as string
          const base64 = result.split(',')[1]
          const src = 'data:' + type + ';base64,' + base64
          resolve(src)
        }
        reader.readAsDataURL(blob)
      } catch (err) {
        reject()
      }
    })
  }

  static capFirst (text) {
    if(!text) return null
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  static getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  }

  static getIcon (name) {
    if (!name) return []
    const array = []
    let iconNS = []
    if (typeof name === 'string') {
      iconNS = name.split(':')
    } else {
      iconNS = name
    }
    if (iconNS.length > 1) {
      switch (iconNS[1]) {
        case 'regular':
          array.push('far')
          break
        case 'solid':
          array.push('fas')
          break
      }
      array.push(iconNS[0])
    } else {
      array.push('fas')
      array.push(name)
    }
    return array
  }

  static generateName () {
    let name1 = ['abandoned', 'able', 'absolute', 'adorable', 'adventurous', 'academic', 'acceptable', 'acclaimed', 'accomplished', 'accurate', 'aching', 'acidic', 'acrobatic', 'active', 'actual', 'adept', 'admirable', 'admired', 'adolescent', 'adorable', 'adored', 'advanced', 'afraid', 'affectionate', 'aged', 'aggravating', 'aggressive', 'agile', 'agitated', 'agonizing', 'agreeable', 'ajar', 'alarmed', 'alarming', 'alert', 'alienated', 'alive', 'all', 'altruistic']
    let name2 = ['people', 'history', 'way', 'art', 'world', 'information', 'map', 'family', 'government', 'health', 'system', 'computer', 'meat', 'year', 'thanks', 'music', 'person', 'reading', 'method', 'data', 'food', 'understanding', 'theory', 'law', 'bird', 'literature', 'problem', 'software', 'control', 'knowledge', 'power', 'ability', 'economics', 'love', 'internet', 'television', 'science', 'library', 'nature', 'fact', 'product', 'idea', 'temperature', 'investment', 'area', 'society', 'activity', 'story', 'industry', 'media', 'thing', 'oven', 'community', 'definition', 'safety', 'quality', 'development', 'language', 'management', 'player', 'variety', 'video', 'week', 'security', 'country', 'exam', 'movie']
    let name = this.capFirst(name1[this.getRandomInt(0, name1.length + 1)]) + ' ' + this.capFirst(name2[this.getRandomInt(0, name2.length + 1)])
    return name
  }
}

import { GameDataResponse } from '../source/lib/igdb'

export const clampToRange = (
  value: number,
  originalMax: number,
  originalMin = 0,
  newMin = 0,
  newMax = 1,
) =>
  ((value - originalMin) * (newMax - newMin)) / (originalMax - originalMin) +
  newMin

export const pickRandom = (array: any[]) =>
  array[Math.floor(Math.random() * array.length)]

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu auctor purus. Maecenas sit amet scelerisque augue. Suspendisse ac arcu nibh. Phasellus accumsan, ante quis rutrum tincidunt, lorem tellus placerat ligula, ut rhoncus ante diam sed est. Integer eget placerat turpis. Cras egestas, mauris eu euismod condimentum, libero arcu venenatis dolor, sit amet lacinia dolor nulla aliquet augue. Aenean aliquam turpis et velit tincidunt mattis. Maecenas sollicitudin iaculis urna, eget ullamcorper nunc vulputate in. Nunc quis condimentum odio. Quisque vestibulum enim ac nisl sollicitudin semper. Maecenas posuere tellus malesuada dolor porta, sed pellentesque metus rutrum. Aenean ornare lectus id ornare fringilla. Pellentesque turpis tortor, placerat quis tristique vel, faucibus in felis. Ut quis odio mollis, convallis nibh vitae, sollicitudin mi. Praesent mollis tortor sit amet pulvinar varius. Ut orci augue, porta in interdum sed, pulvinar ac lorem. Duis cursus purus ac ipsum ultricies, quis mollis quam suscipit. Maecenas tincidunt massa a magna suscipit egestas. Nunc varius, justo congue dignissim tincidunt, odio nibh aliquet ex, sit amet fringilla ex augue ac metus. Fusce id lobortis metus, quis gravida nunc. Curabitur vestibulum dolor mi, non pulvinar dui blandit ac. Morbi ligula odio, tincidunt id luctus dignissim, tempor et felis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut eu nulla sed nibh facilisis faucibus a ac sem. Cras semper, urna sit amet volutpat venenatis, quam ante interdum dui, non convallis ligula massa eu sapien. Maecenas facilisis vehicula suscipit. Praesent eu enim rhoncus, vulputate turpis a, auctor odio. Phasellus quis pellentesque felis. Maecenas dolor risus, viverra id eros eget, venenatis tempus lacus. Curabitur orci odio, accumsan sit amet consectetur et, aliquam sit amet massa. Aliquam eget ipsum a mi condimentum facilisis. Maecenas id laoreet libero. Cras sodales nibh elit. Maecenas scelerisque euismod lectus sit amet vulputate. Fusce varius, diam accumsan eleifend suscipit, ipsum odio rhoncus nunc, cursus porttitor justo velit sit amet enim. Donec venenatis erat ac facilisis aliquam. Pellentesque suscipit nibh sit amet mauris placerat viverra. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla at sapien et dui dapibus gravida tristique at sapien. Aliquam a orci tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In placerat a velit ut ultricies. Sed nulla arcu, lacinia at lectus sit amet, finibus vulputate mi. Integer pulvinar eros quis iaculis dignissim. Etiam id tellus dolor. Praesent sollicitudin fermentum arcu, ac luctus lorem lobortis ac. Maecenas sagittis tristique est, a accumsan nibh pellentesque sit amet. Donec lobortis urna non accumsan dictum. Suspendisse nec mattis lectus, nec vulputate mi. Ut id leo euismod leo efficitur lacinia quis porttitor arcu. Nam odio mi, accumsan ut nisl eget, efficitur suscipit nisl. Nam porttitor est magna, non posuere nisl ultricies eu. Integer eu semper ipsum. Quisque ultricies, quam vel scelerisque volutpat, tortor massa consectetur mauris, at vestibulum urna orci vitae arcu. Suspendisse scelerisque ante at diam pharetra maximus. Duis ac ex nec libero blandit tristique ac a odio.'.split(
  ' ',
)

export const loremIpsum = (length: number) =>
  Array.from(Array(length), (_a, index) => lorem[index % lorem.length]).join(
    ' ',
  )

export const randomNumber = (max = 10) => Math.round(Math.random() * max)

export const createMockData = (): GameDataResponse => {
  return {
    age_ratings: [],
    aggregated_rating: randomNumber(100),
    aggregated_rating_count: randomNumber(500),
    artworks: [],
    category: 0,
    checksum: '',
    cover: randomNumber(),
    created_at: Date.now(),
    dlcs: [],
    external_games: [],
    first_release_date: Date.now(),
    game_engines: [],
    game_modes: [],
    genres: [],
    hypes: randomNumber(),
    id: randomNumber(),
    involved_companies: [],
    keywords: [],
    name: '', //loremIpsum(randomNumber(3)),
    platforms: [],
    player_perspectives: [],
    popularity: randomNumber(),
    pulse_count: randomNumber(),
    rating: randomNumber(100),
    rating_count: randomNumber(500),
    release_dates: [],
    screenshots: [],
    similar_games: [],
    slug: loremIpsum(randomNumber(3)).split(' ').join('-'),
    storyline: '', //loremIpsum(Math.round(randomNumber(30))),
    summary: '', //loremIpsum(Math.round(randomNumber(30))),
    tags: [],
    themes: [],
    total_rating: randomNumber(100),
    total_rating_count: randomNumber(500),
    updated_at: Date.now(),
    url: 'localhost',
    videos: [],
    websites: [],
  }
}

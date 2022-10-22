const getData = async (page) => {
  const data = await fetch(`https://newsdata.io/api/1/news?apikey=pub_125179f41ee139317e20fa03eba3055c1dc7a&language=pt&category=technology&country=br&page=${page}`)
  const jsonData =  await data.json()

  return jsonData.results
}

const fillHome = async () => {
  const data1 = await getData(1)
  const data2 = await getData(2)
  const data3 = await getData(3)
  const allData = [...data1,...data2, ...data3]
  
  const topFive = []
  const topTrailers = []

  console.log("DUAS NOTÍCIAS DO INÍCIO:")

  for (let index = 0; index < 2; index++) {
    console.log(allData[index].title)
    console.log('========================')    
  }

  console.log("QUATRO NOTÍCIAS DA SEGUNDA SEÇÃO:")

  for (let index = 2; index < 6; index++) {
    console.log(allData[index].title)
    console.log('========================')    
  }


  for (n in allData) {
    topFive.length < 5 && allData[n].category.includes('top') && topFive.push(allData[n])
  }
  console.log('TOP FIVE:')
  topFive.forEach(item=>console.log(item.title))

  for (let index = 6; index < allData.length; index ++) {
    topTrailers.length < 3 && allData[index].category.includes('top') && allData[index].keywords.includes('Trailer') && topTrailers.push(allData[index])
  }

  console.log('TOP TRAILERS')
  topTrailers.forEach(trailer=>console.log(trailer.title))


  console.log('TRÊS POSTS COM LAYOUT ESTILO BLOG')
  for (let index = 9; index < 12; index++) {
    console.log(allData[index].title)
    console.log('========================')    
  }

  console.log('TRÊS POSTS AO LADO DOS BLOG POSTS')
  for (let index = 12; index < 15; index++) {
    console.log(allData[index].title)
    console.log('========================')    
  }
}

fillHome()
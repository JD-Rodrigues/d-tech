const getData = async () => {
  const data = await fetch(`https://newsapi.org/v2/top-headlines?country=br&category=technology&pageSize=100&apiKey=331dbd74054842c7951471628b189d72`)
  const jsonData =  await data.json()

  return jsonData.articles
}

const fillHome = async () => {
  const allData = await getData()
  
  const topVideos = []

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

  console.log('TOP FIVE:')
  for (let index = 0; index < 5; index++) {
    console.log(allData[index].title)
    console.log('========================')    
  }
  

  for (let index = 0; index < allData.length; index ++) {
    topVideos.length < 3  && allData[index].source.name === 'YouTube' && topVideos.push(allData[index])
  }

  // if (topTrailers.length < 3) {
  //    topTrailers && topTrailers.forEach(trailer=>topTrailersTitles.push(trailer.title))
  // }


  // for (let index = allData.length-1; index >= 0; index --) {  
  //     topTrailers.length < 3 && topTrailersTitles.includes(allData[index].title) === false && allData[index].keywords &&  allData[index].keywords.includes('Trailer') && topTrailers.push(allData[index])    
  // }



  console.log('TOP VIDEOS')
  topVideos.forEach(video=>{
    console.log(video.title)
    console.log('______________________')
  }
  )


  console.log('TRÊS POSTS COM LAYOUT ESTILO BLOG')
  for (let index = 6; index < 9; index++) {
    console.log(allData[index].title)
    console.log('______________________')
  }

  console.log('TRÊS POSTS AO LADO DOS BLOG POSTS')
  for (let index = 9; index < 12; index++) {
    console.log(allData[index].title)
    console.log('______________________')
  }

  console.log(allData.length)

}

fillHome()
onload = ()=> fillHome()

const getData = async () => {
  const data = await fetch(`https://newsapi.org/v2/top-headlines?country=br&category=technology&pageSize=100&apiKey=331dbd74054842c7951471628b189d72`)
  const jsonData =  await data.json()

  return jsonData.articles
}



const fillHome = async () => {
  const main = document.querySelector('.main')
  const allData = await getData()
  const allArticles = await allData.filter(data=> data.urlToImage !== null)  
  const topVideos = []

  main.innerHTML = `
  <h1 class="title-logo">Tech Office</h1>
  <section id="news1">
  <ul class="news1-list"></ul>
  </section>
  <section id="news2">
  <ul class="news2-list"></ul>
  <ul class="news2-top-five"></ul>
  </section>
  <section id="news3">
  <ul class="top-videos"></ul>
  </section>
  <section id="news4">
  <ul class="news4-list"></ul>
  <ul class="block-lateral"></ul>
  </section>
  `
  const news1List = document.querySelector('.news1-list')
  const news2List = document.querySelector('.news2-list')
  const topFiveArticles = document.querySelector('.news2-top-five')
  const topVideosList = document.querySelector('.top-videos')
  const news4List = document.querySelector('.news4-list')
  const blockLateral = document.querySelector('.block-lateral')
  



  console.log("DUAS NOTÍCIAS DO INÍCIO:")

  for (let index = 0; index < 2; index++) {
    news1List.innerHTML += `
    <li data-article = "allArticles[${index}]">
        <div class="news">
          <img class="news-card" src="${allArticles[index].urlToImage}" alt="">
          <h2 class="news-title">${allArticles[index].title}</h2>
          <p class="news-description">${allArticles[index].description.substring(0,120)}...</p>
        </div>
    </li>
    `

    // console.log(allData[index].title)
    // console.log('========================')    
  }

  console.log("QUATRO NOTÍCIAS DA SEGUNDA SEÇÃO:")

  for (let index = 2; index < 6; index++) {
    news2List.innerHTML += `
    <li data-article = "allArticles[${index}]">
      <div class="news">
        <img class="news-card" src="${allArticles[index].urlToImage}" alt="">
        <h2 class="news-title">${allArticles[index].title}</h2>
        <p class="news-description">${allArticles[index].description.substring(0,80)}...
        </p>
      </div>
    </li>
    `
    // console.log(allArticles[index].title)
    // console.log('========================')    
  }

  console.log('TOP FIVE:')
  for (let index = 0; index < 5; index++) {
    topFiveArticles.innerHTML += `
    <li class="selecao" data-article = "allArticles[${index}]">${allArticles[index].title}</li>
    `
    // console.log(allData[index].title)
    // console.log('========================')    
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
  topVideos.forEach((video, index)=>{
    topVideosList.innerHTML += `
    <li data-article = "topVideos[${index}]">
      <div class="news">
        <img class="news-card" src="${video.urlToImage ? video.urlToImage : 'https://www.technogeekzone.com/wp-content/uploads/2015/09/youtube2Bimage.png'}" alt="">
        <h2 class="news-title">${video.title}</h2>
        <p class="news-description">${video.description ? video.description : ""}</p>
      </div>
    </li>
    `
  }
  )


  console.log('TRÊS POSTS COM LAYOUT ESTILO BLOG')
  for (let index = 6; index < 12; index++) {
    news4List.innerHTML+=`
    <li>
      <div class="news"><img class="news-card" src="${allArticles[index].urlToImage}" alt=""><div class="news-info"><h2 class="news-title">${allArticles[index].title}</h2><p class="news-description">${allArticles[index].description.substring(0,160)}...</p></div></div> 
    </li>
    `
  }

  console.log('TRÊS POSTS AO LADO DOS BLOG POSTS')
  for (let index = 12; index < 15; index++) {
    blockLateral.innerHTML += `
    <li>
      <div class="news">
        <img class="news-card" src="${allArticles[index].urlToImage}" alt="">
        <h2 class="news-title">${allArticles[index].title}</h2><p class="news-description">${allArticles[index].description.substring(0,80)}...</p></div>
    </li>
    `
  }

  console.log(allData.length)

}


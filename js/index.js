onload = ()=> fillHome()

const getData = async () => {
  const data = await fetch(`https://api.bing.microsoft.com/v7.0/news?offset=20`, {method: "GET", headers: { 'Ocp-Apim-Subscription-Key': "7145ac6ef3f447b7895999375761f3db"}})
  const jsonData =  await data.json()
  

  return jsonData.value
}



const fillHome = async () => {
  const main = document.querySelector('.main')
  const allData = await getData()
  // const allData2 = await getData(20)
  const allArticles = await allData
  // [...await allData, ... await allData2]
  console.log(allArticles)
  // const topVideos = []
 
  main.innerHTML = `
  <h1 class="title-logo">Tech Office</h1>
  <section id="news1" class="section-news first">
  <ul class="news1-list"></ul>
  </section>
  <section id="news2" class="section-news second">
  <ul class="news2-list"></ul>
  <ul class="news2-top-five block-rank">
    <h2 class="rank-title">Em alta </h2>
  </ul>
  
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
    <li class="new" data-article = "allArticles[${index}]">
      <div class="news">
        <img class="news-card"
        src="${allArticles[index].image.thumbnail.contentUrl}" alt=""
        >
        <h2 class="news-title"><a href="">${allArticles[index].name}</a></h2>
        <p class="news-description">${allArticles[index].description.substring(0,80)}</p>
      </div>
    </li>
    `

    // console.log(allData[index].title)
    // console.log('========================')    
    // localStorage.setItem('article',JSON.stringify(allArticles[i]))
  }

  console.log("QUATRO NOTÍCIAS DA SEGUNDA SEÇÃO:")

  for (let index = 2; index < 6; index++) {
    news2List.innerHTML += `
    <li class="new" data-article = "allArticles[${index}]">
      <div class="news">
        <img class="news-card" src="${allArticles[index].image.thumbnail.contentUrl}" alt="">
        <h2 class="news-title"><a href="">${allArticles[index].name}</a></h2>
        <p class="news-description">${allArticles[index].description.substring(0,80)}</p>
</div>
    </li>
    `

    // console.log(allArticles[index].title)
    // console.log('========================')    
  }

  console.log('TOP FIVE:')
  for (let index = 0; index < 5; index++) {
    topFiveArticles.innerHTML += `
    <li class="rank-position new rank-link" data-article = "allArticles[${index}]">${allArticles[index].name}</li>
    `
    // console.log(allData[index].title)
    // console.log('========================')    
  }
  

  // for (let index = 0; index < allArticles.length; index ++) {
  //   topVideos.length < 3  && allArticles[index].source.name === 'YouTube' && topVideos.push(allData[index])
  // }

  // if (topTrailers.length < 3) {
  //    topTrailers && topTrailers.forEach(trailer=>topTrailersTitles.push(trailer.title))
  // }


  // for (let index = allData.length-1; index >= 0; index --) {  
  //     topTrailers.length < 3 && topTrailersTitles.includes(allData[index].title) === false && allData[index].keywords &&  allData[index].keywords.includes('Trailer') && topTrailers.push(allData[index])    
  // }



  console.log('TOP VIDEOS')
  for (let index = 0; index < 5; index++) {
    allArticles.innerHTML += `
    <li data-article = "topVideos[${index}]">
      <div class="news">
        <img class="news-card"
        src="${allArticles[index].image.thumbnail.contentUrl}"
    alt=""></a>
        <h2 class="news-title"><a href="">${allArticles[index].name}</a></h2>
        <p class="news-description">${allArticles[index].description}</p>
</div>
    </li>
    `
  }


  console.log('TRÊS POSTS COM LAYOUT ESTILO BLOG')
  for (let index = 6; index < 12; index++) {
    news4List.innerHTML+=`
    <li class="new">
      <div class="news">
        <img class="news-card"
            src="${allArticles[index].image.thumbnail.contentUrl}"
            alt=""> 

      <div class="article">
        <h2 class="news-title">
        ${allArticles[index].name}
        </h2>
        <p class="news-description">${allArticles[index].description}</p>
      </div>
      </div>
    </li>
    `
  }

  console.log('TRÊS POSTS AO LADO DOS BLOG POSTS')
  for (let index = 12; index < 15; index++) {
    blockLateral.innerHTML += `
    <li class="n">
      <div class="news">
        <img class="news-card"
        src="${allArticles[index].image.thumbnail.contentUrl}"
      alt="">
        <h2 class="news-title">${allArticles[index].name}</h2>
        <p class="news-description">${allArticles[index].description}</p>
      </div>
    </li>
    `
  }

  // const newsCards = document.querySelectorAll('.n')
  // newsCards.forEach(n=>console.log(n))

  // newsCards.forEach(card=> card.addEventListener('click', ()=>console.log(card.getAttribute('data-article'))))

  console.log(allData.length)

}




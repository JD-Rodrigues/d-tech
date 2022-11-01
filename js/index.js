onload = async ()=> {
  if(await retrieveLastAccessTime()){
    const date = new Date()
    const time = date.getTime()
    const lastAcess = await retrieveLastAccessTime()
    console.log(time - lastAcess)
    console.log(time - lastAcess >= 86400000)
    if (time - lastAcess >= 86400000) {
      getAndStoreData()
      saveLastAccessTime()
    }
  } else {
      getAndStoreData()
      saveLastAccessTime()
  }
  
  fillHome()
}
const main = document.querySelector('.main')

const getAndStoreData = async () => {
  const data = await fetch('https://current-news.p.rapidapi.com/news/technology', {method: "GET", headers: {'X-RapidAPI-Key': 'a548e897c8mshee0452d3e73b26ep14e469jsn3125e0ca1c43',
  'X-RapidAPI-Host': 'current-news.p.rapidapi.com'}})
  const jsonData =  await data.json()
  const filteredData = await jsonData.news.filter(article=> article.urlToImage!==null && article.description !== null)
  
  localStorage.setItem('allData', JSON.stringify(await filteredData))
}

const retrieveData = (dataName) => {
  const data = JSON.parse(localStorage.getItem(dataName))
  return data
}



const fillHome = async () => {  
  const allArticles = await retrieveData('allData')
  console.log(allArticles)

  

 
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
  const darkSession = document.querySelector('.top-videos')
  const news4List = document.querySelector('.news4-list')
  const blockLateral = document.querySelector('.block-lateral')
  



  console.log("DUAS NOTÍCIAS DO INÍCIO:")

  for (let index = 0; index < 2; index++) {
    news1List.innerHTML += `
    <li class="news-item" data-article = "${index}">
      <div class="news">
        <img class="news-card"
        src="${allArticles[index].urlToImage}" alt=""
        >
        <h2 class="news-title">${allArticles[index].title}</h2>
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
    <li class="news-item" data-article = "${index}">
      <div class="news">
        <img class="news-card" src="${allArticles[index].urlToImage}" alt="">
        <h2 class="news-title">${allArticles[index].title}</h2>
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
    <li class="rank-position news-item rank-link" data-article = "${index}">${allArticles[index].title}</li>
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



  for (let index = 0; index < 3; index++) {
    darkSession.innerHTML += `
    <li class="news-item" data-article = "${index}">
      <div class="news">
        <img class="news-card"
        src="${allArticles[index].urlToImage}"
    alt=""></a>
        <h2 class="news-title">${allArticles[index].title}</h2>
        <p class="news-description">${allArticles[index].description}</p>
</div>
    </li>
    `
  }


  console.log('TRÊS POSTS COM LAYOUT ESTILO BLOG')
  for (let index = 6; index < 12; index++) {
    news4List.innerHTML+=`
    <li class="last-left news-item" data-article = "${index}">
      <div class="news">
        <img class="news-card"
            src="${allArticles[index].urlToImage}"
            alt=""> 

      <div class="article">
        <h2 class="news-title">
        ${allArticles[index].title}
        </h2>
        <p class="news-description">${allArticles[index].description}</p>
      </div>
      </div>
    </li>
    `
  }

 

  // console.log('TRÊS POSTS AO LADO DOS BLOG POSTS')
  // for (let index = 12; allArticles.length; index++) {
  //   blockLateral.innerHTML += `
  //   <li class="news-item" data-article = "${index}">
  //     <div class="news">
  //       <img class="news-card"
  //       src="${allArticles[index].image && allArticles[index].image.thumbnail.contentUrl}"
  //     alt="">
  //       <h2 class="news-title">${allArticles[index].name}</h2>
  //       <p class="news-description">${allArticles[index].description}</p>
  //     </div>
  //   </li>
  //   `
  // }

  const newsCards = document.querySelectorAll('.news-item')
  

  newsCards.forEach(card=> card.addEventListener('click', ()=> {
    localStorage.setItem('selectedItem',JSON.stringify(allArticles[card.getAttribute('data-article')]))
    showArticle()
  }))

  

}

const showArticle = async () => {
  const article = await retrieveData('selectedItem')
  const extracted = await getArticleText(article.url)
  

  main.innerHTML = `
  

  <article class="article first">
    <h1 class="news-title">${await extracted.data.title}</h1>
    <img src="${await extracted.data.image}" alt=""class="news-card">
    <div class="news-content">
      <p>${await extracted.data.content}</p>
    </div>  
  </article>
  `
  if (document.querySelector('.article .news-content img')!== null) {
    document.querySelector('.article .news-card').style.display = "none"
  }

  const videos = document.querySelectorAll('video')

  videos.forEach(video=>video.setAttribute('controls','true'))


}

const getArticleText =async (url)=> {
  const content = await fetch(`https://article-extractor2.p.rapidapi.com/article/parse?url=${url}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a548e897c8mshee0452d3e73b26ep14e469jsn3125e0ca1c43',
      'X-RapidAPI-Host': 'article-extractor2.p.rapidapi.com'
    }
  })

  const contentJson = await content.json()
  console.log(contentJson)
  return contentJson 
  
}

const saveLastAccessTime = () => {
  const date = new Date()
  const time = date.getTime()
  localStorage.setItem('last_access_time',JSON.stringify(time))
}

const retrieveLastAccessTime = async () => {
  const prevAccessTime = localStorage.getItem('last_access_time')
  console.log(JSON.parse(prevAccessTime))
  return JSON.parse(prevAccessTime)
}




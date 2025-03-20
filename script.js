document.addEventListener('DOMContentLoaded', function () {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav a');

  for (const link of navLinks) {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
    });
  }

  // Add active class to section when scrolled into view
  const sections = document.querySelectorAll('.section');

  window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        const id = section.getAttribute('id');
        document.querySelector(`nav a[href="#${id}"]`).classList.add('active');
      } else {
        const id = section.getAttribute('id');
        document.querySelector(`nav a[href="#${id}"]`).classList.remove('active');
      }
    });
  });

  // Add a simple fade-in animation for sections
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });

  // Modal functionality for artist info
  const modal = document.getElementById('artistModal');
  const modalContent = document.getElementById('modalContent');
  const closeBtn = document.querySelector('.close-btn');
  const moreInfoBtns = document.querySelectorAll('.more-info-btn');

  // Artist details database
  const artistDetails = {
    racionais: {
      name: "Racionais MC's",
      fullBio: `
        <h2>Racionais MC's</h2>
        <img src="https://i.imgur.com/8XZqXZJ.jpg" alt="Racionais MC's" class="artist-image">
        <p>Formado em 1988, o Racionais MC's é considerado o grupo de rap mais influente do Brasil. Composto por Mano Brown (Pedro Paulo Soares Pereira), Ice Blue (Paulo Eduardo Salvador), Edi Rock (Edivaldo Pereira) e KL Jay (Kleber Geraldo Lelis Simões), o grupo surgiu na zona norte de São Paulo.</p>
        
        <h3>Histórico</h3>
        <p>A primeira aparição do grupo foi na coletânea "Consciência Black, Vol. I", com as músicas "Pânico na Zona Sul" e "Tempos Difíceis". Em 1990, lançaram seu primeiro disco, "Holocausto Urbano", mas foi com "Sobrevivendo no Inferno" (1997) que alcançaram reconhecimento nacional, vendendo mais de 1,5 milhão de cópias de forma independente.</p>
        
        <h3>Impacto Cultural</h3>
        <p>O Racionais MC's revolucionou a música brasileira ao dar voz às periferias e denunciar o racismo, a violência policial e a desigualdade social. Suas letras cruas e diretas retratam a realidade das comunidades marginalizadas, tornando-se verdadeiros documentos históricos da experiência negra e periférica no Brasil.</p>
        
        <h3>Principais Álbuns</h3>
        <ul>
          <li><strong>Holocausto Urbano (1990)</strong></li>
          <li><strong>Escolha o Seu Caminho (1992)</strong></li>
          <li><strong>Raio X do Brasil (1993)</strong> - Inclui clássicos como "Fim de Semana no Parque" e "Homem na Estrada"</li>
          <li><strong>Sobrevivendo no Inferno (1997)</strong> - Álbum que entrou para o vestibular da Unicamp como leitura obrigatória</li>
          <li><strong>Nada Como um Dia Após o Outro Dia (2002)</strong></li>
          <li><strong>Cores & Valores (2014)</strong></li>
        </ul>
        
        <h3>Legado</h3>
        <p>Além da música, o grupo expandiu sua atuação para outras áreas, incluindo moda (marca "1 da Sul"), literatura e audiovisual. Em 2018, o documentário "Racionais MC's: Sobrevivendo no Inferno" foi lançado, contando a história do grupo e seu álbum mais emblemático.</p>
      `
    },
    sabotage: {
      name: "Sabotage",
      fullBio: `
        <h2>Sabotage</h2>
        <img src="https://i.imgur.com/9XZqXZJ.jpg" alt="Sabotage" class="artist-image">
        <p>Mauro Mateus dos Santos, conhecido como Sabotage (1973-2003), foi um rapper, compositor e ator brasileiro que deixou uma marca indelével no rap nacional, mesmo com uma carreira relativamente curta.</p>
        
        <h3>Vida</h3>
        <p>Nascido na favela do Canão, na zona sul de São Paulo, Sabotage viveu em meio à pobreza e à criminalidade. Após envolvimento com o tráfico de drogas, encontrou na música uma forma de transformar sua realidade. Seu apelido surgiu de um plano que ele e amigos criaram para "sabotarem" o tráfico local, buscando um caminho diferente do crime.</p>
        
        <h3>Carreira</h3>
        <p>Sabotage ganhou notoriedade ao participar do álbum "O Trem" do grupo RPW e colaborar com o grupo RZO. Em 2000, participou da trilha sonora do filme "O Invasor", dirigido por Beto Brant, onde também atuou. Seu único álbum solo, "Rap é Compromisso!", foi lançado em 2001, e é considerado um clássico do gênero no Brasil.</p>
        
        <h3>Estilo Único</h3>
        <p>Conhecido como o "Mestre da Rima", Sabotage se destacava pelo flow singular e letras poéticas que mesclavam a realidade das favelas com uma linguagem inventiva. Seu estilo era marcado pela criatividade linguística e pela capacidade de criar gírias que se tornaram parte do vocabulário das periferias paulistanas.</p>
        
        <h3>Legado</h3>
        <p>Em 24 de janeiro de 2003, Sabotage foi assassinado a tiros aos 29 anos, interrompendo prematuramente uma carreira promissora. Apesar da breve trajetória, seu trabalho segue influenciando gerações de artistas brasileiros, não apenas no rap, mas também na MPB e em outros gêneros. Seu único álbum foi relançado postumamente várias vezes e continua a ser celebrado como uma obra-prima do rap nacional.</p>
        
        <h3>Frases Célebres</h3>
        <p>"Rap é compromisso, não é viagem", "Humildade para sempre", "A vida é desafio" - estas são algumas das frases que se tornaram mantras para os fãs de Sabotage e para o rap nacional como um todo.</p>
      `
    },
    emicida: {
      name: "Emicida",
      fullBio: `
        <h2>Emicida</h2>
        <img src="https://i.imgur.com/7XZqXZJ.jpg" alt="Emicida" class="artist-image">
        <p>Leandro Roque de Oliveira, mais conhecido pelo nome artístico Emicida (nascido em 17 de agosto de 1985), é um rapper, compositor e produtor brasileiro que revolucionou a cena do rap nacional por sua versatilidade musical e empreendedorismo.</p>
        
        <h3>Origem do Nome</h3>
        <p>O nome artístico "Emicida" combina as palavras "MC" e "homicida", surgindo de sua habilidade de "assassinar" oponentes em batalhas de freestyle. Essa reputação foi construída em competições como a Rinha dos MCs, onde se destacou.</p>
        
        <h3>Carreira</h3>
        <p>Emicida iniciou sua carreira nas batalhas de MCs em São Paulo. Em 2008, lançou seu primeiro single independente, "Triunfo", que se tornou um sucesso sem apoio de grandes gravadoras. Este foi o início da Laboratório Fantasma, empresa fundada por ele e seu irmão Fióti, que cresceu de uma pequena produtora musical para uma marca de moda e entretenimento.</p>
        
        <h3>Laboratório Fantasma</h3>
        <p>A Laboratório Fantasma representa o espírito empreendedor de Emicida. O que começou como um selo independente para produzir seus próprios discos transformou-se em uma marca que realiza desfiles na São Paulo Fashion Week e exporta produtos para vários países.</p>
        
        <h3>Música e Influências Culturais</h3>
        <p>Musicalmente, Emicida é conhecido por mesclar o rap com diversos gêneros brasileiros, como samba, MPB e afrobeat. Suas colaborações incluem artistas como Caetano Veloso, Vanessa da Mata, Criolo e artistas internacionais.</p>
        
        <h3>Trabalhos Importantes</h3>
        <ul>
          <li><strong>O Glorioso Retorno de Quem Nunca Esteve Aqui (2013)</strong> - Primeiro álbum de estúdio</li>
          <li><strong>Sobre Crianças, Quadris, Pesadelos e Lições de Casa (2015)</strong></li>
          <li><strong>AmarElo (2019)</strong> - Projeto multiplatforma que incluiu álbum, show no Theatro Municipal de São Paulo e documentário na Netflix</li>
        </ul>
        
        <h3>Ativismo</h3>
        <p>Além da música, Emicida é conhecido por seu ativismo social. Suas letras frequentemente abordam questões raciais, desigualdade social e política brasileira. Tornou-se uma voz importante nas discussões sobre racismo estrutural no Brasil.</p>
      `
    },
    djonga: {
      name: "Djonga",
      fullBio: `
        <h2>Djonga</h2>
        <img src="https://i.imgur.com/6XZqXZJ.jpg" alt="Djonga" class="artist-image">
        <p>Gustavo Pereira Marques, conhecido artisticamente como Djonga (nascido em 4 de junho de 1994), é um rapper, compositor e ativista brasileiro de Belo Horizonte, Minas Gerais. Ele se tornou um dos nomes mais importantes da nova geração do rap nacional.</p>
        
        <h3>Início de Carreira</h3>
        <p>Djonga começou sua carreira no rap em 2015, participando de batalhas de MC em Belo Horizonte. Antes da fama, formou-se em História e trabalhou em diversas funções, incluindo garçom e professor. Seu nome artístico é uma homenagem ao jogador de futebol moçambicano Tico-Tico.</p>
        
        <h3>Ascensão</h3>
        <p>Em 2017, lançou seu primeiro álbum "Heresia", que chamou atenção pela contundência das letras e pela produção musical de alta qualidade. No ano seguinte, com "O Menino Que Queria Ser Deus" (2018), consolidou-se como uma das vozes mais relevantes da nova geração. A sequência de lançamentos incluiu "Ladrão" (2019), "Histórias da Minha Área" (2020) e "Nu" (2021).</p>
        
        <h3>Estilo e Temáticas</h3>
        <p>O trabalho de Djonga é marcado por letras que abordam de forma direta temas como racismo, desigualdade social, política e vivências da periferia. Seu estilo é caracterizado por um flow agressivo e versos diretos, combinados com produções que mesclam elementos do trap com o rap tradicional.</p>
        
        <h3>Reconhecimento Internacional</h3>
        <p>Em 2020, Djonga fez história ao se tornar o primeiro rapper brasileiro indicado ao BET Hip Hop Awards na categoria "Melhor Fluxo Internacional", prêmio americano que celebra o hip-hop global.</p>
        
        <h3>Ativismo e Impacto Social</h3>
        <p>Além da música, Djonga é conhecido por seu posicionamento político e social. Suas apresentações ao vivo são energéticas e muitas vezes incluem discursos sobre a situação política do Brasil e questões raciais. Tem sido uma voz importante contra o racismo e a repressão policial nas periferias.</p>
        
        <h3>Empreendedorismo</h3>
        <p>Seguindo uma tendência no rap brasileiro, Djonga fundou sua própria gravadora independente, a Ceia Ent., que além de gerenciar sua carreira, também produz outros artistas da cena mineira.</p>
      `
    },
    criolo: {
      name: "Criolo",
      fullBio: `
        <h2>Criolo</h2>
        <img src="https://i.imgur.com/5XZqXZJ.jpg" alt="Criolo" class="artist-image">
        <p>Kleber Cavalcante Gomes, conhecido como Criolo (nascido em 5 de setembro de 1975), é um rapper, cantor, compositor e ator brasileiro que se destaca por sua versatilidade musical e profundidade lírica.</p>
        
        <h3>Origem e Início de Carreira</h3>
        <p>Nascido no bairro do Grajaú, na zona sul de São Paulo, Criolo começou sua carreira no rap em 1989, aos 14 anos. Nos anos 2000, organizava a Rinha dos MCs, uma das mais importantes batalhas de freestyle de São Paulo, que revelou talentos como Emicida.</p>
        
        <h3>Versatilidade Musical</h3>
        <p>Embora tenha começado no rap, Criolo ganhou reconhecimento nacional com o álbum "Nó na Orelha" (2011), onde mesclou rap com outros gêneros como samba, reggae e MPB. Esta versatilidade se tornou sua marca registrada, permitindo que transitasse entre diferentes públicos e cenas musicais.</p>
        
        <h3>Carreira e Obras Significativas</h3>
        <ul>
          <li><strong>Ainda Há Tempo (2006)</strong> - Primeiro álbum, focado no rap tradicional</li>
          <li><strong>Nó na Orelha (2011)</strong> - Trabalho que o projetou nacionalmente</li>
          <li><strong>Convoque Seu Buda (2014)</strong></li>
          <li><strong>Espiral de Ilusão (2017)</strong> - Álbum dedicado ao samba</li>
          <li><strong>Sobre Viver (2022)</strong> - Reflexões sobre o período da pandemia</li>
        </ul>
        
        <h3>Reconhecimento e Parcerias</h3>
        <p>Ao longo de sua carreira, Criolo recebeu diversos prêmios, incluindo vários VMB (Video Music Brasil) da MTV e o Prêmio da Música Brasileira. Colaborou com artistas consagrados como Caetano Veloso, Milton Nascimento, Ney Matogrosso e Ivete Sangalo, além de participar de festivais internacionais.</p>
        
        <h3>Temas e Impacto</h3>
        <p>Suas letras abordam desde questões sociais urgentes como desigualdade, racismo e violência urbana até reflexões filosóficas sobre a existência humana. A combinação de crítica social com poesia elaborada fez de Criolo uma voz respeitada tanto no meio artístico quanto no debate público brasileiro.</p>
        
        <h3>Atuação e Projetos Paralelos</h3>
        <p>Além da música, Criolo atuou em produções audiovisuais e participa ativamente de projetos sociais, principalmente voltados para a juventude de periferia. Sua produtora, Oloko Records, busca fomentar novos talentos da cena independente.</p>
      `
    },
    rincon: {
      name: "Rincon Sapiência",
      fullBio: `
        <h2>Rincon Sapiência</h2>
        <img src="https://i.imgur.com/4XZqXZJ.jpg" alt="Rincon Sapiência" class="artist-image">
        <p>Rincon Sapiência (nascido em 1985, em São Paulo) é um rapper brasileiro conhecido por mesclar elementos da cultura afro-brasileira com o rap contemporâneo, criando um estilo único que ele denomina "afrorap".</p>
        
        <h3>Trajetória</h3>
        <p>Antes de se dedicar à música, Rincon estudou publicidade e trabalhou como designer gráfico. Iniciou sua carreira musical por volta de 2010, lançando mixtapes e EPs independentes. Porém, foi com o single "Ponta de Lança (Verso Livre)" em 2016 que ganhou destaque nacional, atingindo milhões de visualizações nas plataformas digitais.</p>
        
        <h3>Estilo e Identidade</h3>
        <p>O diferencial de Rincon está na afirmação da identidade negra e na valorização da cultura africana em sua música. Ele incorpora elementos do afrobeat, funk e samba, além de usar em suas letras referências a religiões de matriz africana, culinária e expressões culturais da diáspora negra.</p>
        
        <h3>Visual e Estética</h3>
        <p>Além da música, Rincon se destaca pelo visual, que inclui turbantes, estampas africanas e diversos elementos que reforçam a conexão com suas raízes. Esta estética se estende aos seus videoclipes, que frequentemente exploram simbologias afro-brasileiras.</p>
        
        <h3>Discografia Importante</h3>
        <ul>
          <li><strong>Galanga Livre (2017)</strong> - Seu álbum de estreia pela gravadora Boia Fria Produções</li>
          <li><strong>Fora de Ordem (2022)</strong> - Segundo álbum de estúdio</li>
        </ul>
        
        <h3>Temas e Mensagem</h3>
        <p>Suas letras abordam temas como empoderamento negro, orgulho da cultura afro-brasileira, críticas sociais e celebração da vida na periferia. Diferente de alguns rappers que focam apenas nas dificuldades, Rincon também celebra as alegrias e resistências das comunidades periféricas.</p>
        
        <h3>Parcerias e Colaborações</h3>
        <p>Ao longo de sua carreira, colaborou com artistas como Emicida, Rael, Liniker e Mano Brown, além de participar de trilhas sonoras para cinema e publicidade.</p>
        
        <h3>Legado</h3>
        <p>Rincon Sapiência tem contribuído significativamente para a renovação do rap brasileiro, abrindo caminhos para que outros artistas explorem suas raízes africanas e incorporem elementos de diversas culturas em suas produções.</p>
      `
    }
  };

  // Open modal with artist details
  moreInfoBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const artistId = this.getAttribute('data-artist');
      const artistInfo = artistDetails[artistId];

      if (artistInfo) {
        modalContent.innerHTML = artistInfo.fullBio;
        modal.style.display = 'block';

        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal when clicking the x button
  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  // Close modal when clicking outside of it
  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Add escape key to close modal
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // MC Creator functionality
  const mcCreatorForm = document.getElementById('mc-creator');
  const mcResult = document.getElementById('mc-result');

  if (mcCreatorForm) {
    mcCreatorForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form values
      const mcName = document.getElementById('mc-name').value;
      const mcOrigin = document.getElementById('mc-origin').value;
      const mcStyle = document.getElementById('mc-style').value;

      // Get selected themes
      const selectedThemes = [];
      const checkboxes = document.querySelectorAll('input[name="themes"]:checked');
      checkboxes.forEach(checkbox => {
        selectedThemes.push(checkbox.value);
      });

      // Get verse (if provided)
      const mcVerse = document.getElementById('mc-verse').value;

      // Generate MC profile
      generateMCProfile(mcName, mcOrigin, mcStyle, selectedThemes, mcVerse);
    });
  }

  function generateMCProfile(name, origin, style, themes, verse) {
    // Create image URLs based on style
    const styleImages = {
      'oldschool': 'https://i.imgur.com/1XZqXZJ.jpg',
      'trap': 'https://i.imgur.com/2XZqXZJ.jpg',
      'boom-bap': 'https://i.imgur.com/3XZqXZJ.jpg',
      'conscious': 'https://i.imgur.com/4XZqXZJ.jpg',
      'gangsta': 'https://i.imgur.com/5XZqXZJ.jpg',
      'melodic': 'https://i.imgur.com/6XZqXZJ.jpg'
    };

    // Style descriptions
    const styleDescriptions = {
      'oldschool': 'com um estilo clássico que remete às origens do hip-hop, batidas boom bap e letras diretas.',
      'trap': 'com influências do trap, batidas pesadas e hi-hats rápidos, trazendo um som contemporâneo e vibrante.',
      'boom-bap': 'mantendo viva a tradição boom bap, com batidas orgânicas e samples de vinil.',
      'conscious': 'focado em letras conscientes e críticas sociais, usando o rap como ferramenta de transformação.',
      'gangsta': 'com narrativas cruas sobre a vida nas ruas e realidades urbanas, sem filtros ou concessões.',
      'melodic': 'misturando rap com melodias cantadas, criando um estilo híbrido e versátil que transita entre gêneros.'
    };

    // Theme descriptions
    const themeMap = {
      'social': 'questões sociais',
      'street': 'vida nas ruas',
      'politics': 'crítica política',
      'love': 'relacionamentos e sentimentos',
      'party': 'celebrações e festas',
      'lifestyle': 'estilo de vida e cultura urbana'
    };

    // Format themes for description
    let themesText = '';
    if (themes.length > 0) {
      const themeDescriptions = themes.map(theme => themeMap[theme]);

      if (themeDescriptions.length === 1) {
        themesText = themeDescriptions[0];
      } else if (themeDescriptions.length === 2) {
        themesText = `${themeDescriptions[0]} e ${themeDescriptions[1]}`;
      } else {
        const lastTheme = themeDescriptions.pop();
        themesText = `${themeDescriptions.join(', ')} e ${lastTheme}`;
      }
    } else {
      themesText = 'temas variados';
    }

    // Generate HTML
    const html = `
      <h3>${name}</h3>
      <div class="mc-details">
        <div>
          <div class="mc-image" style="background-image: url('${styleImages[style] || styleImages.oldschool}');"></div>
          <p><strong>Origem:</strong> ${origin}</p>
          <p><strong>Estilo:</strong> ${style === '' ? 'Versátil' : style.charAt(0).toUpperCase() + style.slice(1)}</p>
          <p><strong>Principais temas:</strong> ${themesText}</p>
        </div>
        <div>
          <h4>Biografia</h4>
          <p>${name} é um MC originário de ${origin}, ${styleDescriptions[style] || 'com um estilo versátil e autêntico'}. Suas letras abordam principalmente ${themesText}, criando conexão com seu público através de rimas impactantes e flow único.</p>
          <p>Influenciado pela cena local e pelos grandes nomes do rap nacional e internacional, ${name.split(' ')[0]} vem construindo seu caminho na cultura hip-hop, desenvolvendo uma identidade artística autêntica e buscando seu espaço no cenário.</p>
        </div>
      </div>
      ${verse ? `
      <div class="mc-verse">
        <p>${verse}</p>
      </div>
      ` : ''}
    `;

    // Update result and display
    mcResult.innerHTML = html;
    mcResult.classList.remove('hidden');

    // Scroll to result
    setTimeout(() => {
      mcResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  // Gerenciamento de imagens
  handleImageLoading();

  // Configurar imagens de fundo para seções
  setupBackgroundImages();
});

// Função para gerenciar o carregamento de imagens
function handleImageLoading() {
  const allImages = document.querySelectorAll('img');

  allImages.forEach(img => {
    // Adicionar classe de carregamento
    if (img.parentElement.classList.contains('artist-photo-container')) {
      img.parentElement.classList.add('loading');
    }

    // Imagem carregada com sucesso
    img.addEventListener('load', function () {
      img.classList.add('loaded');
      if (img.parentElement.classList.contains('artist-photo-container')) {
        img.parentElement.classList.remove('loading');
      }
    });

    // Erro no carregamento da imagem
    img.addEventListener('error', function () {
      console.log('Erro ao carregar imagem:', img.src);

      // Usar uma imagem de fallback
      if (img.classList.contains('artist-photo')) {
        img.src = 'https://i.imgur.com/JFHj3jP.jpg';
      } else if (img.classList.contains('album-reference')) {
        img.src = 'https://i.imgur.com/AWzjxVL.jpg';
      } else if (img.classList.contains('artist-image')) {
        img.src = 'https://i.imgur.com/JFHj3jP.jpg';
      }

      img.classList.add('loaded');
      if (img.parentElement.classList.contains('artist-photo-container')) {
        img.parentElement.classList.remove('loading');
      }
    });

    // Para imagens que já foram carregadas
    if (img.complete) {
      img.classList.add('loaded');
      if (img.parentElement.classList.contains('artist-photo-container')) {
        img.parentElement.classList.remove('loading');
      }
    }
  });
}

// Função para configurar imagens de fundo das seções
function setupBackgroundImages() {
  const sectionsWithBg = document.querySelectorAll('.section-with-bg');

  sectionsWithBg.forEach(section => {
    const bgImage = section.getAttribute('data-bg');
    if (bgImage) {
      section.style.setProperty('--bg-image', `url(${bgImage})`);

      // Pré-carregar a imagem
      const img = new Image();
      img.src = bgImage;

      // Adicionar classe quando a imagem carregar
      img.onload = function () {
        section.classList.add('bg-loaded');
      };
    }
  });
} 
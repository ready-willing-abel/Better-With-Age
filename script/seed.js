const db = require('../server/db')
const {
  User,
  Category,
  Cheese,
  Purchase
} = require('../server/db/models')
// const chalk = require('chalk')
// const chance = require('chance').Chance()
// const Promise = require('bluebird')

async function seed() {
  await db.sync({
    force: true
  })
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      name: 'Big Sean',
      email: 'cody@email.com',
      password: '123',
      isAdmin: true
    }),
    User.create({
      name: 'Murphy Lee',
      email: 'murphy@email.com',
      password: '123'
    }),
    User.create({
      name: 'Eetai Magic',
      email: 'eetai@email.com',
      password: '123'
    }),
    User.create({
      name: 'Robin Cello',
      email: 'robin@email.com',
      password: '123',
      isAdmin: true
    }),
    User.create({
      name: 'Abel Cheese',
      email: 'abel@email.com',
      password: '123'
    }),
    User.create({
      name: 'Vanessa Coffee',
      email: 'vanessa@email.com',
      password: '123'
    }),
    User.create({
      name: 'Jacques Greene',
      email: 'jacque@email.com',
      password: '123'
    }),
    User.create({
      name: 'Bob Moses',
      email: 'bob@email.com',
      password: '123',
      isAdmin: true
    }),
    User.create({
      name: 'Christian Nodal',
      email: 'christian@email.com',
      password: '123',
      isAdmin: true
    }),
    User.create({
      name: 'Frank Ocean',
      email: 'frank@email.com',
      password: '123'
    }),
    User.create({
      name: 'Tyler Creator',
      email: 'tyler@email.com',
      password: '123'
    }),
    User.create({
      name: 'Drake Drake',
      email: 'drake@email.com',
      password: '123',
      isAdmin: true
    }),
    User.create({
      name: 'Local Natives',
      email: 'local@email.com',
      password: '123'
    }),
    User.create({
      name: 'James Blake',
      email: 'james@email.com',
      password: '123'
    }),
    User.create({
      name: 'Vince Staples',
      email: 'vince@email.com',
      password: '123'
    }),
    User.create({
      name: 'Monte Booker',
      email: 'monte@email.com',
      password: '123',
      isAdmin: true
    })
  ])

  console.log(`seeded ${users.length} users`)


  const cheeses = await Promise.all([
    Cheese.create({
      name: 'Gouda',
      price: '50',
      quantity: 40,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6vdx44qC8cQC5fhleMVvZNh8Qwyiji4AMzgI6UxnE1s1RZpm1",
      description: "Gouda, or Howda as the locals say, is a Dutch cheese named after the city of Gouda in the Netherlands. If truth be told, it is one of the most popular cheeses in the world, accounting for 50 to 60 percent of the world's cheese consumption. It is a semi-hard cheese celebrated for its rich, unique flavour and smooth texture. The original cheese markets in Gouda is one of the last standing commercial cheese markets in the Netherlands. Since the name is not protected, it has become a generic classification for all cheeses produced and sold under the name Gouda. Gouda is typically made from pasteurised cow’s milk although some artisan varieties use sheep’s or goat’s milk to produce cheeses that are going to be aged for a long time. Boerenkaas is a typical variety of unpasteurised Gouda cheese produced by the farmers from milk of cow's grazing on the natural, low pastures of Netherlands. There are seven different types of Gouda cheese, categorized depending on age. Graskaas is young Gouda ready to be consumed within weeks of production. On the other hand, is the extra aged, Overjarig cheese which has a full-flavoured, hard, golden interior and salty flavour reminiscent of a toffee. Between the spectrums is a variety of Dutch Gouda’s classified as per the texture and age - Jong, Jong belegen, Belegen, Extra belegen, and Oud. Each cheese gets increasingly firmer in texture and richer in flavour than earlier classification. The waxed rind of the cheese also changes by the age as soft, younger Dutch Gouda cheese are identified by yellow, orange, or red wax rinds white mature cheese have black wax coverings."
    }),
    Cheese.create({
      name: 'Cheddar',
      price: '21',
      quantity: 20,
      imageUrl: "https://bigoven-res.cloudinary.com/image/upload/c_fill,h_300,w_300/cheddar-cheese.jpg",
      description: "Cheddar cheese, the most widely purchased and eaten cheese in the world is always made from cow's milk. It is a hard and natural cheese that has a slightly crumbly texture if properly cured and if it is too young, the texture is smooth. It gets a sharper taste as it matures, over a period of time between 9 to 24 months. Shaped like a drum, 15 inches in diameter, Cheddar cheese is natural rind bound in cloth while its colour generally ranges from white to pale yellow. However, some Cheddars may have a manually added yellow-orange colour."
    }),
    Cheese.create({
      name: 'Brie',
      price: '14',
      quantity: 15,
      imageUrl: "https://www.gourmetfoodstore.com/images/Product/large/mon-sire-brie-mon-sire-1S-2627.jpg",
      description: "Brie is the best known French cheese and has a nickname The Queen of Cheeses. Brie is a soft cheese named after the French region Brie, where it was originally created. Several hundred years ago, Brie was one of the tributes which had to be paid to the French kings."
    }),
    Cheese.create({
      name: 'Mozzarella',
      price: '61',
      quantity: 30,
      imageUrl: "https://atmedia.imgix.net/d3b9fbfb7d8a295b7a4c405ac926347d8aad7bf1?auto=format&q=45&w=540.0&h=540.0&fit=max&cs=strip",
      description: "Mozzarella cheese is a sliceable curd cheese originating in Italy. Traditional Mozzarella cheese is made from milk of water buffalos herded in very few countries such as Italy and Bulgaria. As a result, most of the Mozzarella cheeses available now are made from cow's milk."
    }),
    Cheese.create({
      name: 'Gruyere',
      price: '45',
      quantity: 50,
      imageUrl: "http://www.cheesesfromswitzerland.com/fileadmin/_processed_/csm_content_gruyere_70deb08889.jpg",
      description: "Gruyere is named after a Swiss village. It is traditional, creamery, unpasteurised, semi-soft cheese. The natural, rusty brown rind is hard, dry and pitted with tiny holes. The cheese is darker yellow than Emmental but the texture is more dense and compact. Slightly grainy, the cheese has a wonderful complexity of flavours - at first fruity, later becomes more earthy and nutty. To make Gruyere, raw milk is heated to 93 degrees F and liquid rennet is added for curdling. The resulting curd is cut into small pieces which release whey while being stirred. Curd is cooked at 110 degrees F and raised quickly to 130 degrees F. The pieces become shriveled which is the cue to place the curd in molds for pressing. The cheese is salted in brine for 8 days and ripened for two months at room temperature or a quick method: 10 days at 50 degrees F. Curing lasts from 3 to 10 months (the longer the curing period the better the cheese)."
    }),
    Cheese.create({
      name: 'Manchego',
      price: '50',
      quantity: 100,
      imageUrl: "http://mandalindeli.co.uk/wp-content/uploads/2016/12/manchego-cheese.jpg",
      description: "The Manchego is produced in the La Mancha region of Spain, which is also home to Don Quixote. It is made from unpasteurised sheep's milk. It is one of the popular cheeses from Spain, made from sheep's milk. It also comes under the PDO guidelines.    "
    }),
    Cheese.create({
      name: 'Camembert',
      price: '21',
      quantity: 90,
      imageUrl: "https://www.andrewjamesworldwide.com/images/andrew-james-rustic-french-style-camembert-baker-p360-7813_image.jpg",
      description: "Marie Harel created the original Camembert cheese from raw milk in Normandy, France in 1791. Today, however, a very small percentage of producers make cheese from raw milk with the same process as Marie Harel would have used. Those who produce cheese using Marie Harel's method, can legally call their cheese Camembert Normandie under the AOC guidelines. However, the production of Camembert cheese has now transcended the AOC designation. Very good varieties of Camembert cheese made from pasteurised milk can be found in Normandy today. The best of them is the Camembert Le Châtelain."
    }),
    Cheese.create({
      name: 'Cotija',
      price: '14',
      quantity: 70,
      imageUrl: "http://files.wisconsincheesetalk.com/wp-content/uploads/2015/05/cotija-crumbles.jpg",
      description: "Cotija is a Hispanic-style cheese named after the town of Cotija in the Mexican state of Michoacán. This hard, crumbly Mexican cheese is made mainly from cow’s milk."
    }),
    Cheese.create({
      name: 'Feta',
      price: '4',
      quantity: 80,
      imageUrl: "http://www.cheesemaking.com/Shared/Images/Product/Feta-Cheese-Recipe/Feta_hero.jpg",
      description: "Feta is undoubtedly one of the most famous Greek cheeses. In fact, Feta occupies 70% stake in Greek cheese consumption. The cheese is protected by EU legislations and only those cheeses manufactured in Macedonia, Thrace, Thessaly, Central Mainland Greece, the Peloponnese and Lesvos can be called ‘feta’. Similar cheeses produced elsewhere in the eastern Mediterranean and around the Black Sea, outside the EU, are often called ‘white cheese’."
    }),
    Cheese.create({
      name: 'Muenster',
      price: '12',
      quantity: 75,
      imageUrl: "http://pixel.nymag.com/imgs/daily/grub/2013/04/01/01-muenster-cheese.w710.h473.2x.jpg",
      description: "Muenster is an American imitation of the French Munster cheese, named after an Alsatian abbey of Munster in the Vosgian Mountains of France. It is made from pasteurised whole cow's milk. Muenster is smooth, pale yellow in colour with an orange rind, a result of the vegetable colouring added during cheese making. The taste varies from mild & bland like a classic white American cheese to sharp like a Jack cheese. Smooth, moist and soft in texture, the cheese can develop a strong, pungent aroma if properly aged. Though, its mild flavour goes well with dishes where you do not want the cheese to overpower other ingredients. Compared to the European version, the taste and aroma of American Muenster is milder. Also, it is sold younger than its counterpart."
    }),
    Cheese.create({
      name: 'Burrata',
      price: '8',
      quantity: 100,
      imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51B1vs3%2BavL._SY355_.jpg",
      description: "Burrata, meaning buttery in Italian is a fresh cheese made from a mix of mozzarella and cream. The outside thin shell is a pasta filata curd made of buffalo and/or cow's milk mozzarella while the insides contain a soft, doughy, stringy, mixture of curd and fresh cream. The cheese originated in the Apulia region of Italy known for sheep farming and agriculture. It is sold traditionally in asphodel leaves with a polyethylene plastic bag over it. The green colour of asphodel leaves is an indicator of the freshness of the cheese."
    }),
    Cheese.create({
      name: 'Swiss',
      price: '5',
      quantity: 90,
      imageUrl: "https://az616578.vo.msecnd.net/files/2017/01/15/636200553336849231725159057_Dollarphotoclub_53674521.jpg",
      description: "Swiss cheese is a generic name for several related varieties of cheese. It is an American version of the Swiss Emmental and is known for being shiny, pale yellow. While it has a firmer texture than baby Swiss, its flavour is mild, sweet and nut-like. It has a savory, but not very sharp taste. Some types of Swiss cheese have a distinctive appearance. Some cheeses have holes known as 'eyes' while some do not. Swiss cheese without eyes is known as 'blind'.  But in general, the larger the eyes in a Swiss cheese, the more pronounced its flavour!"
    }),
    Cheese.create({
      name: 'Comte',
      price: '13',
      quantity: 70,
      imageUrl: "https://theflexitarian.co.uk/wp-content/uploads/2015/10/Comte-800.jpg",
      description: "Comté (also called Gruyère de Comté or Comte Fort Saint Antoine) is a French cheese produced in the Jura Massif region of Eastern France. The unpasteurised cow's milk used is mainly from Montbeliarde Cattle or French simmental (or cross breeds of the two). This hard mountain cheese is matured to perfection in the silence and darkness of special caves where the cheese gets its unique taste, texture and colour. There are several maturing cellars in the region where Comté is ripened for a minimum of 4 months to 18 or 24 months. A few times, Comté gets its name from the cellar where it has ripened such as Comté Fort Saint-Antoine."
    }),
    Cheese.create({
      name: 'Butterkase',
      price: '11',
      quantity: 80,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/DeutschButterk%C3%A4se.jpg/1200px-DeutschButterk%C3%A4se.jpg",
      description: "Butterkase is a semi-soft cheese with a golden natural rind, very popular in Germany and Austria for its creamy texture, buttery like taste. Its name, when literally translated means butter cheese, but the cheese is butter free. However, the appealing flavour and appearance makes it a great hit on a cheeseboard. Produced in Landhaus with original cultures and traditional German production methods, it is aged for a very brief period resulting in a mild taste and flavour."
    }),
    Cheese.create({
      name: 'Oaxaca',
      price: '7',
      quantity: 75,
      imageUrl: "https://sep.yimg.com/ca/I/mex-grocer_2268_135897090",
      description: "Oaxaca, also known as Queso Oaxaca, Asadero or Quesillo is a Mexican name for a semi-soft, white, string-type, Hispanic-style cheese made from cow's milk. Belonging to the pasta filata family, similar to a Mozzarella, Oaxaca is a stretched curd cheese, kneaded and sold in long ropes gently wound in balls."
    })
  ])

  console.log(`seeded ${cheeses.length} cheeses`)

  const categories = await Promise.all([


  ])






  const purchases = await Promise.all([
    Purchase.create({
      quantity: 3,
      priceAtTimeOfSale: 1.99,
      ordered: false,
      userId: 3,
      cheeseId: 5
    }),
    Purchase.create({
      quantity: 7,
      priceAtTimeOfSale: 1.99,
      ordered: false,
      userId: 2,
      cheeseId: 1
    }),
    Purchase.create({
      quantity: 2,
      priceAtTimeOfSale: 1.99,
      ordered: false,
      userId: 7,
      cheeseId: 3
    }),
    Purchase.create({
      quantity: 6,
      priceAtTimeOfSale: 1.99,
      ordered: false,
      userId: 5,
      cheeseId: 2
    }),
    Purchase.create({
      quantity: 4,
      priceAtTimeOfSale: 1.99,
      ordered: false,
      userId: 1,
      cheeseId: 4
    }),
    Purchase.create({
      quantity: 3,
      priceAtTimeOfSale: 1.99,
      ordered: false,
      userId: 1,
      cheeseId: 5
    }),
    Purchase.create({
      quantity: 7,
      priceAtTimeOfSale: 1.99,
      ordered: false,
      userId: 2,
      cheeseId: 1
    }),
    Purchase.create({
      quantity: 2,
      priceAtTimeOfSale: 1.99,
      ordered: false,
      userId: 3,
      cheeseId: 3
    }),
    Purchase.create({
      quantity: 6,
      priceAtTimeOfSale: 1.99,
      ordered: false,
      userId: 8,
      cheeseId: 7
    }),
    Purchase.create({
      quantity: 4,
      priceAtTimeOfSale: 1.99,
      ordered: false,
      userId: 9,
      cheeseId: 9
    }),
    Purchase.create({
      quantity: 3,
      priceAtTimeOfSale: 1.99,
      ordered: false,
      userId: 10,
      cheeseId: 10
    }),
    Purchase.create({
      quantity: 7,
      priceAtTimeOfSale: 1.99,
      ordered: false,
      userId: 6,
      cheeseId: 15
    }),
    Purchase.create({
      quantity: 2,
      priceAtTimeOfSale: 1.99,
      ordered: false,
      userId: 10,
      cheeseId: 12
    }),
    Purchase.create({
      quantity: 6,
      priceAtTimeOfSale: 1.99,
      ordered: false,
      userId: 13,
      cheeseId: 4
    }),
    Purchase.create({
      quantity: 4,
      priceAtTimeOfSale: 1.99,
      ordered: false,
      userId: 12,
      cheeseId: 8
    })
  ])

  console.log(`seeded ${purchases.length} purchases`)

  console.log(`seeded successfully`)

}


seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
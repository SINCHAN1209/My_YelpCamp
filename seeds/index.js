const mongoose = require('mongoose');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');
const cities = require('./cities');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 100) + 99;
        const camp = new Campground({
            author:'64bd3b02fee618c7dbc1f84b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque nihil deserunt sit, iure molestias qui ullam adipisci nam doloremque error placeat ex mollitia ipsum aperiam deleniti cupiditate. Sint, temporibus sed!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/ddbkeafjf/image/upload/v1692518203/YelpCamp/pctfvynmmcelahxuikhs.jpg',
                    filename: 'YelpCamp/pctfvynmmcelahxuikhs'
                },
                {
                    url: 'https://res.cloudinary.com/ddbkeafjf/image/upload/v1692721957/YelpCamp/n7nav2wumkb3oyoinwow.jpg',
                    filename: 'YelpCamp/n7nav2wumkb3oyoinwow'
                }
            ]
        })
        await camp.save()
    }
}
seedDB().then(() => {
    mongoose.connection.close()
})


//https://source.unsplash.com/collection/1273441/   
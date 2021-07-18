
const index = (req, res) => {
    res.redirect('/posts');
  }
  
  const about = (req, res) => {
    res.render('about', { title: 'About' });
  }

  const NotFound = (req, res) => {
    res.status(404).render('404', { title: '404' });
  }

  module.exports = {
    index, 
    about,
    NotFound,
  }
export const getAboutPage = (req, res) => {
    return res.render('layout/default', {title: "About Page", 
        data: { path: "views/about", props: {} }, 
        user: req.session.user  });
};
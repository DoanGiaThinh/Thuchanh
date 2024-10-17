export const getAboutPage = (req, res) => {
    return res.render('layout/defaut', {title: "About Page", data: { path: "views/about", props: {} } });
};
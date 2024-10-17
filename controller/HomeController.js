export const getHomePage = (req, res) => {
    return res.render('layout/defaut', {title: "Home Page", data: { path: "views/home", props: {} } });
};
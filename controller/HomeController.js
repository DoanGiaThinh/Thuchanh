export const getHomePage = (req, res) => {
    return res.render('layout/default', {title: "Main page", data: {path: "views/home",props:{}}})
}


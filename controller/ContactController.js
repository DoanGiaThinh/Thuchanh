export const getContactPage = (req, res) => {
    return res.render('layout/defaut', {title: "Contact Page", data: { path: "views/contact", props: {} } });
};
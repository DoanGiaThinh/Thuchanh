export const getContactPage = (req, res) => {
    return res.render('layout/default', {title: "Contact Page", data: { path: "views/contact", props: {} } });
};
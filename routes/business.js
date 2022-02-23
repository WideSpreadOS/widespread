const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

 
/* Models */
const User = require('../models/User');
const Company = require('../models/Company');
const Subpage = require('../models/SubPage');

router.get('/', async (req, res) => {
    const allCompanies = await Company.find()
    res.render('business/home', { subZone: 'Home', zone: 'Business', subZonePage: 'Home', allCompanies})
});


router.get('/company/:id', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    const pages = await Subpage.find({ 'company_site': { $eq: companyId } });
    const companyName = company.company_name;
    res.render('business/company/home', { subZone: 'Company', zone: 'Business', subZonePage: 'Home', company, pages})
});

/* Subpages */
router.get('/company/:id/page/:pageId', async (req, res) => {
    const companyId = req.params.id;
    const pageId = req.params.pageId;
    const company = await Company.findById(companyId);
    const pages = await Subpage.find({ 'company_site': { $eq: companyId } });
    const page = await Subpage.findById(pageId);
    const pageName = page.page_name;
    res.render('business/company/sub-page', { subZone: 'Company', zone: 'Business', subZonePage: pageName, company, page, pages})
});


/* Employee Portal */
router.get('/employee/:id', async (req, res) => {
   const companyId = req.params.id; 
   const company = await Company.findById(companyId)
   res.render('business/company/employee/portal', { subZone: 'Company', zone: 'Business', subZonePage: 'Employee Portal', company})
});


/* Admin Portal */
router.get('/admin/:id', async (req, res) => {
    const companyId = req.params.id; 
    const company = await Company.findById(companyId)
    res.render('business/company/admin/portal', { subZone: 'Company', zone: 'Business', subZonePage: 'Admin Portal', company})

});

/* Admin Manage Public Pages */
router.get('/admin/:id/manage/public-pages', async (req, res) => {
    const companyId = req.params.id; 
    const company = await Company.findById(companyId)
    const subPages = await Subpage.find({ company_site: { $eq: companyId } });
    console.log(subPages)
    res.render('business/company/admin/manage-pages', { subZone: 'Company', zone: 'Business', subZonePage: 'Manage Public Pages', company, subPages})

});


/* Admin Edit Subpage */
router.get('/admin/:id/manage/public-pages/edit/:pageId', async (req, res) => {
    const companyId = req.params.id;
    const pageId = req.params.pageId;
    const company = await Company.findById(companyId);
    const pages = await Subpage.find({ 'company_site': { $eq: companyId } });
    const page = await Subpage.findById(pageId);
    const pageName = page.page_name;
    res.render('business/company/admin/sub-page-edit', { subZone: 'Company', zone: 'Business', subZonePage: pageName, company, page, pages })
});

/* Admin Add Subpage */
router.get('/admin/:id/manage/public-pages/add', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    res.render('business/company/admin/sub-page-add', { subZone: 'Company', zone: 'Business', subZonePage: 'Add New Page', company })
});

router.post('/admin/:id/manage/public-pages/add', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    const newPage = new Subpage({
        company_site: company.id,
        page_name: req.body.page_name,
        "page_body.page_header1": req.body.page_header1,
        "page_body.page_body1": req.body.page_body1,
        "page_body.page_header2": req.body.page_header2,
        "page_body.page_body2": req.body.page_body2,
        "page_body.page_header3": req.body.page_header3,
        "page_body.page_body3": req.body.page_body3,
        "page_side.phone1": req.body.phone1,
        "page_side.phone2": req.body.phone2,
        "page_side.phone3": req.body.phone3,
        "page_side.email1": req.body.email1,
        "page_side.email2": req.body.email2,
        "page_side.email3": req.body.email3,
        "page_side.email4": req.body.email4,
        "page_side.fax1": req.body.fax1,
        "page_side.fax2": req.body.fax2,
        "page_side.main_office.street": req.body.street,
        "page_side.main_office.city": req.body.city,
        "page_side.main_office.state": req.body.state,
        "page_side.main_office.country": req.body.country,
        "page_side.main_office.zip": req.body.zip,
        "page_side.sub_office.street_sub": req.body.street_sub,
        "page_side.sub_office.city_sub": req.body.city_sub,
        "page_side.sub_office.state_sub": req.body.state_sub,
        "page_side.sub_office.country_sub": req.body.country_sub,
        "page_side.sub_office.zip_sub": req.body.zip_sub,
    });
    newPage.save()
    res.redirect(`/business/admin/${company.id}/manage/public-pages`);    
});

/* Admin Edit Subpage */
router.patch('/admin/:id/manage/public-pages/:pageId', async (req, res) => {
    const companyId = req.params.id;
    const pageId = req.params.pageId;
    const company = await Company.findById(companyId);
    const page = await Subpage.findByIdAndUpdate(pageId, {
        page_name: req.body.page_name,
        "page_body.page_header1": req.body.page_header1,
        "page_body.page_body1": req.body.page_body1,
        "page_body.page_header2": req.body.page_header2,
        "page_body.page_body2": req.body.page_body2,
        "page_body.page_header3": req.body.page_header3,
        "page_body.page_body3": req.body.page_body3,
        "page_side.phone1": req.body.phone1,
        "page_side.phone2": req.body.phone2,
        "page_side.phone3": req.body.phone3,
        "page_side.email1": req.body.email1,
        "page_side.email2": req.body.email2,
        "page_side.email3": req.body.email3,
        "page_side.email4": req.body.email4,
        "page_side.fax1": req.body.fax1,
        "page_side.fax2": req.body.fax2,
        "page_side.main_office.street": req.body.street,
        "page_side.main_office.city": req.body.city,
        "page_side.main_office.state": req.body.state,
        "page_side.main_office.country": req.body.country,
        "page_side.main_office.zip": req.body.zip,
        "page_side.sub_office.street_sub": req.body.street_sub,
        "page_side.sub_office.city_sub": req.body.city_sub,
        "page_side.sub_office.state_sub": req.body.state_sub,
        "page_side.sub_office.country_sub": req.body.country_sub,
        "page_side.sub_office.zip_sub": req.body.zip_sub,
    });
    const pageName = page.page_name;
    res.redirect(req.get('referer'));    
});

/* Admin Delete Subpage */
router.get('/admin/:companyId/manage/public-pages/delete/:pageId', async (req, res) => {
    const pageId = req.params.pageId;
    const companyId = req.params.companyId;
    await Subpage.findByIdAndDelete(pageId)
    res.redirect(`/business/admin/${companyId}/manage/public-pages`)
});


/* WORK */

router.get('/work', async (req, res) => {
    res.render('business/work/home', { subZone: 'Work', zone: 'Business', subZonePage: 'Home', })
});

router.get('/work/schedule', async (req, res) => {
    res.render('business/work/schedule', { subZone: 'Work', zone: 'Business', subZonePage: 'Schedule', })
});

router.get('/work/notes', async (req, res) => {
    res.render('business/work/notes', { subZone: 'Work', zone: 'Business', subZonePage: 'Notes', })
});

router.get('/work/projects', async (req, res) => {
    res.render('business/work/projects', { subZone: 'Work', zone: 'Business', subZonePage: 'Projects', })
});

router.get('/work/presentations', async (req, res) => {
    res.render('business/work/presentations', { subZone: 'Work', zone: 'Business', subZonePage: 'Presentations', })
});

router.get('/work/help', async (req, res) => {
    res.render('business/work/help', { subZone: 'Work', zone: 'Business', subZonePage: 'Help', })
});


/* RESOURCES */

router.get('/resources', (req, res) => {
    res.render('business/resources/home', { subZone: 'Resources', zone: 'Business', subZonePage: 'Home', })
});

router.get('/resources/text-editor', (req, res) => {
    res.render('business/resources/text-editor', { subZone: 'Resources', zone: 'Business', subZonePage: 'Text Editor', })
});

router.get('/resources/code-editor', (req, res) => {
    res.render('business/resources/code-editor', { subZone: 'Resources', zone: 'Business', subZonePage: 'Code Editor', })
});

router.get('/resources/calculators', (req, res) => {
    res.render('business/resources/calculators', { subZone: 'Resources', zone: 'Business', subZonePage: 'Calculators', })
});

router.get('/resources/information', (req, res) => {
    res.render('business/resources/information', { subZone: 'Resources', zone: 'Business', subZonePage: 'Information', })
});

router.get('/resources/help', (req, res) => {
    res.render('business/resources/help', { subZone: 'Resources', zone: 'Business', subZonePage: 'Help', })
});


/* NEWS */

router.get('/news', (req, res) => {
    res.render('business/news/home', { subZone: 'News', zone: 'Business', subZonePage: 'Home', })
});


/* JOB SEARCH */

router.get('/job-search', (req, res) => {
    res.render('business/jobs/home', { subZone: 'Jobs', zone: 'Business', subZonePage: 'Home', })
});


/* INSIGHTS */

router.get('/insights', (req, res) => {
    res.render('business/insights/home', { subZone: 'Insights', zone: 'Business', subZonePage: 'Home', })
});


/* HELP */

router.get('/help', (req, res) => {
    res.render('business/help/home', { subZone: 'Help', zone: 'Business', subZonePage: 'Home', })
});


module.exports = router;
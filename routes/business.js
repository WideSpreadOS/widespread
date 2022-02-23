const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

 
/* Models */
const User = require('../models/User');
const Company = require('../models/Company');
const Subpage = require('../models/Subpage');

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
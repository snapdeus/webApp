const Comic = require('../models/comics')

module.exports.index = async (req, res) => {
    const comics = await Comic.find({})
        .sort({ "filename": -1 })
    res.render('comics/index', { comics })
    req.flash('success', "FOUND IT FOUND")
};

module.exports.renderNewForm = (req, res) => {
    res.render('comics/new');
}

module.exports.createComic = async (req, res) => {
    const comic = new Comic(req.body.comic);
    await comic.save();
    console.log(comic)
    req.flash('success', 'Successfully made a new comic!');
    res.redirect(`/comics/${ comic._id }`)
    // res.send(req.body)

};



module.exports.showComic = async (req, res) => {
    const comic = await Comic.findById(req.params.id)
    if (!comic) {
        req.flash('error', 'Cannot Find that Comic');
        res.redirect('/comics');
    }
    res.render('comics/showComic', { comic });
    //TESTING THAT FLASH WORKS
    // req.flash('error', 'Cannot Find that Comic');
    // res.redirect('/');

}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const comic = await Comic.findById(id);
    if (!comic) {
        req.flash('error', 'Cannot Find that Comic');
        res.redirect('/comics');
    }

    res.render('comics/edit', { comic });
}

module.exports.updateComic = async (req, res) => {
    const { id } = req.params;
    // console.log(req.body);
    const comic = await Comic.findByIdAndUpdate(id, { ...req.body.comic });
    // const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    // campground.images.push(...imgs);
    // await campground.save();
    // if (req.body.deleteImages) {
    //     for (let filename of req.body.deleteImages) {
    //         await cloudinary.uploader.destroy(filename);
    //     }
    //     await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    // }
    req.flash('success', "Successfully updated Comic")
    res.redirect(`/comics/${ comic._id }`)
};

module.exports.deleteComic = async (req, res) => {
    const { id } = req.params;
    await Comic.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted comic!');
    res.redirect('/comics');
}
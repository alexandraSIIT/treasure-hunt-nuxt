module.exports = (app, db) => {
    app.post('/submit', (req, res) => {
        if (req.body && req.body.pin === "abc") {
            db.collection('winners').find({'team': req.body.team}).toArray((err, items) => {
                if (err) {
                    res.status(500);
                    res.json({
                        error: 'Something went wrong when reading DB',
                    });
                } else {
                    if (items.length) {
                        res.status(409);
                        res.json({
                            error: 'Your team already won! Check out the leaderboard to see where you\'re at'
                        });
                    } else {
                        db.collection('winners').insert({
                            team: req.body.team,
                            timestamp: new Date().getTime(),
                        }, (err, result) => {
                            if (err) {
                                res.status(500);
                                res.json({
                                    error: 'Something went wrong saving the winner team in DB',
                                });
                            } else {
                                res.json({
                                    success: true
                                });
                            }
                        });
                    }
                }
            });
        } else {
            db.collection('trials').insert({
                team: req.body.team,
                timestamp: new Date().getTime(),
                pin: req.body.pin,
            });
            res.json({ success: false });
        }
    });

    app.get('/leaderboard', (req, res) => {
        db.collection('winners').find().sort({ timestamp: 1 }).toArray((err, items) => {
            res.json({
                items: items.map((w, index) => {
                    return Object.assign(w, { index: index + 1 });
                }),
            });
        })
    })
}
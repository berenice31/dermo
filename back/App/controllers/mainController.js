const { google } = require('googleapis');

const mainController = {


    homepage: async(req,res, next) => {
        try{
            const auth = new google.auth.GoogleAuth({
                keyFile: "credentials.json",
                scopes : "https://www.googleapis.com/auth/spreadsheets",
            });

            //! creation de l'instance client pour l'authentification
            const client = await auth.getClient();

            //! instance de l' API de google sheets 
            const googleSheets = google.sheets({ version: "v4", auth: client });

            const spreadsheetId = process.env.spreadsheetId;

            //! données a mettre dans la feuille de calcul
            //! https://docs.google.com/spreadsheets/d/(spreadsheet => 10T66cilbp1GUN8-xwFbjcPmDbXbtKftnfoAEVYp_Wvk(<= spreadsheet)/edit#gid=0
            const metaData = await googleSheets.spreadsheets.get({
                auth,
                spreadsheetId,
            });

            //! lire des ligne de notre feuille googlesheets
            const getRows = await googleSheets.spreadsheets.values.get({
                auth,
                spreadsheetId,
                range: "Feuille 1!A:A",
            })

            //TODO écrire dans la feuille de données
            await googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: "Feuille 1!A:B", // on ne selectionne que les colonnes où on veut écrire.
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: [
                        ["requin", "shark"],
                        ["zèbre","zebra"]
                    ],
                }
            })


            res.send(getRows.data);
        }
        catch(err){
            console.trace(err);
            res.status(500).render('error', {err});
        }
    },
    notFound:(req,res,next) => {
        res.status(404).render('page404');
    }
};

module.exports = mainController;
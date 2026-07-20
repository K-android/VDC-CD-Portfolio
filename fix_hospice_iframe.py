import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

old_hospice = """                      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border shadow-inner rounded ${
                        isArch ? "border-gray-200 bg-gray-50" : "border-white/10 bg-[#020304]"
                      }`}>
                        {selectedArsenalItem.details.images.map((img: string, idx: number) => (
                           <img 
                             key={`hospice-sheet-${idx}`} 
                             src={getStaticThumbnailUrl(img)} 
                             alt={`Hospice Sheet ${idx + 1}`} 
                             referrerPolicy="no-referrer"
                             className={`w-full h-auto rounded border shadow-sm cursor-zoom-in transition-transform hover:scale-[1.02] ${
                               isArch ? "border-gray-300" : "border-gray-800"
                             }`}
                             onClick={() => {
                               setExpandedMedia({
                                 src: img,
                                 isVideo: false,
                                 googleDriveId: getDriveId(img),
                                 alt: `Hospice Sheet ${idx + 1}`
                               });
                             }}
                           />
                        ))}
                      </div>"""

new_hospice = """                      <div className={`w-full h-[580px] sm:h-[680px] xl:h-[780px] border shadow-inner relative overflow-hidden rounded ${
                        isArch ? "border-gray-200 bg-white" : "border-white/10 bg-[#020304]"
                      }`}>
                        <iframe
                          src={`https://drive.google.com/embeddedfolderview?id=1ow-E8p-3WvpReBLDsSdUR5DnheaNVJ4M#grid`}
                          className="w-full h-full border-0"
                          title="Karunya Hospice and Palliative Care Center Thesis Sheets Viewer Layout"
                          allow="autoplay"
                        ></iframe>
                      </div>"""

app = app.replace(old_hospice, new_hospice)

with open('src/App.tsx', 'w') as f:
    f.write(app)

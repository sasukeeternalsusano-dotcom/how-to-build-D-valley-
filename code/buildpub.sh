cd "$(dirname "$0")"   # run from the game folder
pre='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light;padding:env(safe-area-inset-top,0px) 0 env(safe-area-inset-bottom,0px)}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>'
LIST1="cutexit.js extras.js p1.js p2.js decor_it.js trk_c1.js opn_c1.js vict.js aud.js scene.js p3.js house.js npc.js cast.js secret.js expand.js ch2sq.js camp.js opening.js p4.js cutsel.js qs.js photo.js tail.js"
LIST2="cutexit.js extras.js pre_wide.js p1.js p2.js decor_it.js trk_c2a.js opn_c2.js vict.js aud.js scene.js p3.js house.js npc.js cast.js secret.js expand.js ch2sq.js camp.js opening.js p4.js ch2.js ch2ev.js qs.js photo.js tail.js"
for f in opn_c1.js opn_c2.js opening.js; do [ -f $f ] || echo "" > $f; done
(echo "$pre"; cat head.html theme1.html lay.html; echo '<script>'; cat $LIST1; echo '</script>') > pub/chapter1.html
(echo "$pre"; cat head.html theme2.html lay.html; echo '<script>'; cat $LIST2; echo '</script>') | sed 's/<title>Danoya Valley<\/title>/<title>Danoya Valley Chapter 2<\/title>/' > pub/chapter2.html
LIST3="cutexit.js extras.js pre_wide.js p1.js p2.js decor_it.js trk_c2.js vict.js aud.js scene.js p3.js house.js npc.js cast.js secret.js expand.js camp.js opening.js p4.js ch2.js ch2ev.js ch3.js exitbtn.js qs.js photo.js joy.js tail.js"
(echo "$pre"; cat head.html theme3.html lay.html; echo '<script>'; cat $LIST3; echo '</script>') | sed 's/<title>Danoya Valley<\/title>/<title>Danoya Valley Chapter 3<\/title>/' > pub/chapter3.html

LIST4="cutexit.js extras.js pre_wide.js p1.js p2.js decor_it.js trk_c2.js vict.js aud.js scene.js p3.js house.js npc.js cast.js secret.js expand.js camp.js opening.js p4.js ch2.js ch2ev.js ch4.js exitbtn.js qs.js photo.js tail.js"
(echo "$pre"; cat head.html theme4.html lay.html; echo '<script>'; cat $LIST4; echo '</script>') | sed 's/<title>Danoya Valley<\/title>/<title>Danoya Valley Chapter 4<\/title>/' > pub/chapter4.html

LIST5="cutexit.js extras.js pre_wide.js p1.js p2.js decor_it.js trk_c2.js vict.js aud.js scene.js p3.js house.js npc.js cast.js secret.js expand.js camp.js opening.js p4.js ch2.js ch2ev.js ch5a.js ed5h.js ch5b.js ch5c.js ch5d.js exitbtn.js qs.js photo.js joy.js tail.js"
(echo "$pre"; cat head.html theme5.html lay.html; echo '<script>'; cat $LIST5; echo '</script>') | sed 's/<title>Danoya Valley<\/title>/<title>Danoya Valley Chapter 5<\/title>/' > pub/chapter5.html

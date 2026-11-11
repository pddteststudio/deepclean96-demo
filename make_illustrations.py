from pathlib import Path
from html import escape
root=Path(__file__).parent/'assets'
base='''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 420" fill="none"><defs>
<linearGradient id="main" x1="160" y1="150" x2="493" y2="355" gradientUnits="userSpaceOnUse"><stop stop-color="{top}"/><stop offset="1" stop-color="{bottom}"/></linearGradient>
<filter id="blur" x="-50%" y="-100%" width="200%" height="300%"><feGaussianBlur stdDeviation="12"/></filter></defs>
<circle cx="337" cy="187" r="157" fill="{orb}"/><circle cx="337" cy="187" r="181" stroke="{edge}" stroke-width="2" stroke-opacity=".3" stroke-dasharray="5 12"/>
<ellipse cx="317" cy="356" rx="205" ry="17" fill="#27433C" fill-opacity=".16" filter="url(#blur)"/>
<path d="M475 63c4 13 12 21 25 25-13 4-21 12-25 25-4-13-12-21-25-25 13-4 21-12 25-25Z" fill="{spark}"/>
<circle cx="167" cy="121" r="8" fill="{spark}"/>{art}
</svg>'''
arts={
'sofa': dict(top='#F8EBD8', bottom='#D8BBA3', orb='#F7DBCA', edge='#D6A88B', spark='#FFF8E5', art='''
<path d="M172 310h27v55h-25zM426 310h27v55h-25z" fill="#8F766B"/>
<rect x="167" y="146" width="286" height="181" rx="54" fill="url(#main)" stroke="#C5A18C" stroke-width="5"/>
<rect x="183" y="139" width="127" height="163" rx="43" fill="#F7E9DB" stroke="#DFBEA5" stroke-width="4"/>
<rect x="311" y="139" width="127" height="163" rx="43" fill="#F7E9DB" stroke="#DFBEA5" stroke-width="4"/>
<rect x="140" y="237" width="89" height="107" rx="35" fill="#E4C7B0" stroke="#C4A28A" stroke-width="4"/>
<rect x="390" y="237" width="90" height="107" rx="35" fill="#E4C7B0" stroke="#C4A28A" stroke-width="4"/>
<rect x="185" y="264" width="249" height="70" rx="23" fill="#F6E5CF" stroke="#D2B19D" stroke-width="4"/>
<path d="M310 272v55" stroke="#D5B5A3" stroke-width="4"/>
<rect x="235" y="216" width="58" height="54" rx="14" transform="rotate(-10 235 216)" fill="#C5C6A3"/>
<path d="M221 181c-10 17-12 35-11 52" stroke="white" stroke-opacity=".66" stroke-width="7" stroke-linecap="round"/>
'''),
'mattress': dict(top='#F5EDFC', bottom='#C9BCE4', orb='#E2D7F8', edge='#B6A2D8', spark='#FFF8EA', art='''
<path d="M151 281 376 203l112 68-224 80-113-70Z" fill="#B09FCB"/>
<path d="M154 258 374 184l114 70-218 75-116-71Z" fill="url(#main)" stroke="#B9AAD2" stroke-width="5" stroke-linejoin="round"/>
<path d="m154 258 116 71v24l-116-71v-24ZM270 329l218-75v27l-218 72v-24Z" fill="#DDD4EC" stroke="#B9AAD2" stroke-width="4" stroke-linejoin="round"/>
<path d="m198 248 167-56 76 46-168 57-75-47Z" fill="#FFFAFF"/><path d="m250 233 82-27 43 27-83 26-42-26Z" fill="#DDD4EE"/>
<path d="m199 265 64 39M391 254l47-16" stroke="#D0C6DE" stroke-width="3" stroke-linecap="round"/>
<path d="M170 198c9-15 24-15 33 0M189 182c7-12 19-12 25 0" stroke="#FFF" stroke-width="5" stroke-linecap="round"/>
'''),
'chair': dict(top='#D4EAE4', bottom='#9ED3C2', orb='#BCE9D5', edge='#8AC3AE', spark='#F9F5DB', art='''
<path d="M220 276h20l-13 90h-18zM395 276h20l13 90h-18z" fill="#836D5A"/>
<rect x="210" y="128" width="207" height="189" rx="72" fill="url(#main)" stroke="#73A893" stroke-width="6"/>
<path d="M232 173c0-24 17-39 39-39h75c25 0 47 19 47 47v96H232V173Z" fill="#DCF1E7"/>
<path d="M310 154v113" stroke="#B2D7C8" stroke-width="4"/>
<path d="M238 231c22-9 49-11 72-9M317 222c28-5 49-4 72 5" stroke="#FFF" stroke-opacity=".6" stroke-width="5" stroke-linecap="round"/>
<rect x="170" y="240" width="98" height="94" rx="31" fill="#A3CFC0" stroke="#73A893" stroke-width="5"/>
<rect x="363" y="240" width="98" height="94" rx="31" fill="#A3CFC0" stroke="#73A893" stroke-width="5"/>
<rect x="217" y="277" width="200" height="55" rx="20" fill="#C5E5D6" stroke="#91BFAE" stroke-width="4"/>
'''),
'rug': dict(top='#FFF0CF', bottom='#ECC48E', orb='#FFE1A8', edge='#E5C17E', spark='#FFF9E7', art='''
<path d="m136 242 216-116 144 119-218 123-142-126Z" fill="#C79069"/>
<path d="m143 231 210-110 142 116-214 120-138-126Z" fill="url(#main)" stroke="#BA8C68" stroke-width="6" stroke-linejoin="round"/>
<path d="m181 235 170-89 105 88-172 96-103-95Z" stroke="#E8AE72" stroke-width="6"/>
<path d="m219 230 132-69 69 61-137 76-64-68Z" stroke="#F6E4BF" stroke-width="7" stroke-dasharray="6 11"/>
<path d="m294 224 53-27 30 28-54 30-29-31Z" fill="#E2A06D" stroke="#E7C7A0" stroke-width="3"/>
<path d="m143 231-14 5m31 7-14 6m31 8-14 6m32 11-14 6m31 8-14 6m31 11-14 6m31 11-14 6" stroke="#C58C6E" stroke-width="4" stroke-linecap="round"/>
'''),
'leather': dict(top='#E2EAF5', bottom='#A8C3DF', orb='#C8E2F1', edge='#A7C9E0', spark='#FCF8E8', art='''
<path d="M238 291h23l-19 78h-16zM394 291h24l19 78h-17z" fill="#4C5D71"/>
<rect x="213" y="133" width="218" height="188" rx="72" fill="#7999B7" stroke="#5D7896" stroke-width="6"/>
<rect x="229" y="143" width="186" height="153" rx="57" fill="url(#main)" stroke="#829DBA" stroke-width="4"/>
<path d="M263 165c-17 34-19 69-10 94M383 165c14 31 18 65 12 92" stroke="#ECF6FC" stroke-opacity=".8" stroke-width="5" stroke-linecap="round"/>
<path d="M321 152v136M275 267c32 8 65 8 96 0" stroke="#7C9BB8" stroke-width="3" stroke-dasharray="3 10" stroke-linecap="round"/>
<rect x="169" y="237" width="93" height="96" rx="31" fill="#84A4BE" stroke="#5D7896" stroke-width="5"/>
<rect x="382" y="237" width="92" height="96" rx="31" fill="#84A4BE" stroke="#5D7896" stroke-width="5"/>
<rect x="218" y="273" width="212" height="60" rx="22" fill="#B5CAE1" stroke="#7C9CB9" stroke-width="5"/>
'''),
'auto': dict(top='#F9E8E8', bottom='#D9AFB8', orb='#F7D7D9', edge='#D8A8B5', spark='#FFF9EC', art='''
<ellipse cx="313" cy="324" rx="188" ry="18" fill="#8C6470" fill-opacity=".17"/>
<path d="m142 242 49-58c19-23 45-36 75-36h100c27 0 51 12 66 33l33 45 26 20c13 8 19 22 19 36v24H132v-32c0-13 3-23 10-32Z" fill="url(#main)" stroke="#AC7887" stroke-width="6"/>
<path d="m232 164-48 65h232l-40-65H232Z" fill="#547586" stroke="#A4B6BC" stroke-width="5" stroke-linejoin="round"/>
<path d="M310 165v65" stroke="#BFD1D7" stroke-width="5"/>
<rect x="153" y="248" width="46" height="17" rx="8" fill="#FCF5DC"/><rect x="444" y="248" width="46" height="17" rx="8" fill="#FCF5DC"/>
<circle cx="215" cy="305" r="36" fill="#3C4F59"/><circle cx="215" cy="305" r="19" fill="#D8E0DF"/>
<circle cx="431" cy="305" r="36" fill="#3C4F59"/><circle cx="431" cy="305" r="19" fill="#D8E0DF"/>
<path d="M277 246h28M347 246h28" stroke="#9D7781" stroke-width="6" stroke-linecap="round"/>
'''),
}
for name, args in arts.items():
 svg = base.format(**args)
 (root/f'service-{name}.svg').write_text(svg,encoding='utf-8')
print('Generated',len(arts),'service illustrations')

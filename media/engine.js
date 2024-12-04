// Fsh music engine (SMUFL)
export class FMusic {
  constructor(options={}) {
    this.tracks = Array.from(Array(options.tracks ?? 1));
    this.font = options.font ?? 'Bravura';
    this.size = Number(options.size ?? 50);
    this.trackSpacing = options?.trackSpacing ?? 120;
    this.nsdAuto = options?.noteStemDown?.auto ?? true;
    this.nsdAt = options?.noteStemDown?.at ?? 3;
    this.sym = {
      clef: {
        g: '\uE050',
        c: '\uE05C',
        f: '\uE062',
        tab: '\uE06E',
        percusion: '\uE069'
      },
      clef_pos: {
        g: -0.25,
        c: 0,
        f: -0.75,
        tab: -0.5,
        percusion: -0.5
      },
      note: {
        d: '\uE1D1',
        dd: '\uE1D1',
        w: '\uE1D2',
        wd: '\uE1D2',
        sw: '\uE4E3',
        swd: '\uE4E3',
        h: '\uE1D3',
        hd: '\uE1D4',
        sh: '\uE4E4',
        shd: '\uE4E4',
        q: '\uE1D5',
        qd: '\uE1D6',
        sq: '\uE4E5',
        sqd: '\uE4E5',
        e: '\uE1D7',
        ed: '\uE1D8',
        se: '\uE4E6',
        sed: '\uE4E6',
        s: '\uE1D9',
        sd: '\uE1DA',
        ss: '\uE4E7',
        ssd: '\uE4E7',
        ts: '\uE1DB',
        tsd: '\uE1DC',
        sts: '\uE4E8',
        stsd: '\uE4E8',
        sf: '\uE1DD',
        sfd: '\uE1DE',
        ssf: '\uE4E9',
        ssfd: '\uE4E9',
        hte: '\uE1DF',
        hted: '\uE1E0',
        shte: '\uE4EA',
        shted: '\uE4EA',
        hfs: '\uE1E1',
        hfsd: '\uE1E2',
        shfs: '\uE4EB',
        shfsd: '\uE4EB',
        ht: '\uE1E3',
        htd: '\uE1E4',
        sht: '\uE4EC',
        shtd: '\uE4EC'
      },
      bar: {
        n: '\uE030',
        d: '\uE031',
        h: '\uE034',
        dh: '\uE035',
        e: '\uE032',
        er: '\uE033',
        rs: '\uE040',
        re: '\uE041',
        rb: '\uE042',
        dc: '\uE046',
        ds: '\uE045',
        s: '\uE047',
        c: '\uE048',
        dcf: '\uE046 al Fine',
        dsf: '\uE045 al Fine',
        dcc: '\uE046 al Coda',
        dsc: '\uE045 al Coda'
      }
    };
  }
  setTrack(n, obj) {
    this.tracks[n] = {
      clef: obj.clef ?? 'g',
      text: obj.text ?? '',
      inner: obj.inner ?? ''
    };
  }
  paint(id) {
    let content = '';
    for (let i = 0; this.tracks.length>i; i++) {
      let e = this.tracks[i];
      if (!e) continue;
      content += `${e.text ? `<text x="0" y="${i*this.trackSpacing-this.size*(1.1+(e.clef=='g'?0.3:0))}" font-size="${this.size*0.5}" font-family="${this.font}">${e.text}</text>` : ''}<g transform="translate(0, ${i*this.trackSpacing})">${this._getContent(e)}</g>`;
    }
    document.getElementById(id).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg">
  ${content}
</svg>`;
    let svg = document.querySelector(`#${id} > svg`);
    let bbox = svg.getBBox();
    svg.setAttribute("width", bbox.width + "px");
    svg.setAttribute("height", bbox.height + "px");
    svg.setAttribute("viewBox", `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
  }
  _getContent(data) {
    let inner = data.inner.split(',');
    let content = '';
    for (let i = 0; i<inner.length; i++) {
      let c = inner[i].split(':');
      if (c.length < 2) c.push('/');
      c[1] = (c[1].length<1?'/':c[1]).split('/');
      if (c[1].length < 2) c[1].push('');
      switch (c[0].toLowerCase()) {
        case 'b':
          content += `<text x="${this.size+i*this.size-(['dc','ds','s','c','dcf','dsf','dcc','dsc'].includes(c[1][0]) ? this.size*0.25 : 0)}" y="${['dc','ds','s','c','dcf','dsf','dcc','dsc'].includes(c[1][0]) ? this.size*-1.2 : 0}" font-size="${this.size}" font-family="${this.font}">${this.sym.bar[c[1][0]??'n'] ?? '\uE030'}</text>`;
          break;
        case 't':
          content += `<text x="${this.size+i*this.size}" y="${this.size*-0.745}" font-size="${this.size}" font-family="${this.font}">${c[1][0].split('').map(e=>`&#xE08${e}`).join('')}</text><text x="${this.size+i*this.size}" y="${this.size*-0.254}" font-size="${this.size}" font-family="${this.font}">${c[1][1].split('').map(e=>`&#xE08${e}`).join('')}</text>`;
          break;
        case 'n':
          content += `<text x="${this.size+i*this.size}" y="${(c[1][0]=='d'?4:c[1][1])*(this.size*-0.125)}" font-size="${this.size}" font-family="${this.font}">${this.sym.note[c[1][0]+(this.nsdAuto && c[1][1]>this.nsdAt?'d':'')]??'?'}</text>`;
          if (c[1][2]=='d') content += `<text x="${1.5*this.size+i*this.size}" y="${(c[1][0]=='d'?5:((Math.ceil((c[1][1]+1)/2)*2)-1))*(this.size*-0.125)}" font-size="${this.size}" font-family="${this.font}">\uE1E7</text>`;
          break;
        default:
          content += `<text x="${this.size+i*this.size}" y="0" font-size="${this.size}" font-family="${this.font}">?</text>`;
          break;
      }
    }
    return `<text x="${this.size*0.1}" y="${this.size*this.sym.clef_pos[data.clef]}" font-size="${this.size}" font-family="${this.font}">${this.sym.clef[data.clef] ?? '?'}</text>
<rect width="100%" height="${this.size*0.04}" y="${this.size*-1.02}"${data.clef == 'percusion' ? ' style="display:none"' : ''}/>
<rect width="100%" height="${this.size*0.04}" y="${this.size*-0.77}"${data.clef == 'percusion' ? ' style="display:none"' : ''}/>
<rect width="100%" height="${this.size*0.04}" y="${this.size*-0.52}"/>
<rect width="100%" height="${this.size*0.04}" y="${this.size*-0.27}"${data.clef == 'percusion' ? ' style="display:none"' : ''}/>
<rect width="100%" height="${this.size*0.04}" y="${this.size*-0.02}"${data.clef == 'percusion' ? ' style="display:none"' : ''}/>
<text x="100%" text-anchor="end" y="0" font-size="${this.size}" font-family="${this.font}">\uE032</text>
${content}`;
  }
}

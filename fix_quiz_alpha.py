from pathlib import Path
from collections import deque
from PIL import Image

FILES=[Path('_site/quiz_correct.png'),Path('_site/quiz_wrong.png')]


def alpha_range(im):
    if im.mode!='RGBA':
        return None
    a=im.getchannel('A')
    return a.getextrema()


def bg_color(im):
    rgb=im.convert('RGB')
    w,h=rgb.size
    pts=[]
    for x,y in [(0,0),(w-1,0),(0,h-1),(w-1,h-1),(w//2,0),(w//2,h-1),(0,h//2),(w-1,h//2)]:
        pts.append(rgb.getpixel((x,y)))
    return tuple(sum(p[i] for p in pts)//len(pts) for i in range(3))


def close(c,bg,tol=34):
    return max(abs(c[i]-bg[i]) for i in range(3))<=tol


def make_border_transparent(path):
    im=Image.open(path).convert('RGBA')
    before=alpha_range(im)
    print(f'{path.name}: mode={im.mode} alpha_before={before}')
    if before and before[0] < 250:
        print(f'{path.name}: existing alpha preserved')
        return

    w,h=im.size
    pix=im.load()
    bg=bg_color(im)
    q=deque()
    seen=set()
    for x in range(w):
        q.append((x,0)); q.append((x,h-1))
    for y in range(h):
        q.append((0,y)); q.append((w-1,y))

    changed=0
    while q:
        x,y=q.popleft()
        if (x,y) in seen: continue
        seen.add((x,y))
        r,g,b,a=pix[x,y]
        if not close((r,g,b),bg):
            continue
        pix[x,y]=(r,g,b,0)
        changed+=1
        if x>0:q.append((x-1,y))
        if x+1<w:q.append((x+1,y))
        if y>0:q.append((x,y-1))
        if y+1<h:q.append((x,y+1))

    im.save(path,'PNG',optimize=True)
    after=alpha_range(im)
    print(f'{path.name}: estimated_bg={bg} removed={changed} alpha_after={after}')
    if not after or after[0] == 255:
        raise SystemExit(f'{path.name}: alpha repair failed')


for f in FILES:
    if not f.exists():
        raise SystemExit(f'missing {f}')
    make_border_transparent(f)

/* ===== 户型图设计器 - 主逻辑 ===== */
var ROOM_TYPES = [
  {id:"living",   name:"客厅",   color:"#5cb85c", minArea:16, ratio:0.30},
  {id:"masterBed",name:"主卧",   color:"#7b68ee", minArea:12, ratio:0.18},
  {id:"bed2",     name:"次卧",   color:"#9b8cfe", minArea:9,  ratio:0.12},
  {id:"bed3",     name:"卧室3",  color:"#c8b8ff", minArea:9,  ratio:0.10},
  {id:"kitchen",  name:"厨房",   color:"#daa520", minArea:6,  ratio:0.08},
  {id:"dining",   name:"餐厅",   color:"#deb887", minArea:8,  ratio:0.08},
  {id:"bath",     name:"卫生间", color:"#4682b4", minArea:4,  ratio:0.06},
  {id:"bath2",    name:"卫2",   color:"#87ceeb", minArea:3.5,ratio:0.05},
  {id:"study",    name:"书房",   color:"#cd5c5c", minArea:8,  ratio:0.08},
  {id:"balcony",  name:"阳台",   color:"#20b2aa", minArea:4,  ratio:0.05},
  {id:"stair",    name:"楼梯间", color:"#808080", minArea:6,  ratio:0.06},
  {id:"storage",  name:"储藏室", color:"#a0a0a0", minArea:3,  ratio:0.04}
];
var DEFAULT_ROOMS = ["living","masterBed","bed2","kitchen","dining","bath","bath2","stair"];

/* ===== 家具目录 ===== */
var FURNITURE_CATALOG = {
  // 客厅
  living: [
    {id:"sofa",      name:"沙发",       emoji:"🛋️", w:220, h:90},
    {id:"coffeeTable",name:"茶几",      emoji:"🪑", w:120, h:60},
    {id:"tvCabinet", name:"电视柜",     emoji:"🗄️", w:180, h:40},
    {id:"tv",        name:"电视",       emoji:"📺", w:110, h:8},
    {id:"armchair",  name:"单人沙发",   emoji:"🛋️", w:80,  h:80},
    {id:"bookshelf", name:"书架",       emoji:"📚", w:100, h:30},
    {id:"plant",     name:"绿植",       emoji:"🪴", w:40,  h:40},
    {id:"rug",       name:"地毯",       emoji:"🟫", w:200, h:140, isArea:true},
  ],
  // 主卧
  masterBed: [
    {id:"bed180",   name:"双人床1.8m", emoji:"🛏️", w:200, h:220},
    {id:"mattress", name:"床垫",       emoji:"🛏️", w:180, h:200},
    {id:"wardrobe", name:"衣柜",       emoji:"🗄️", w:200, h:55},
    {id:"nightstand",name:"床头柜",    emoji:"🗄️", w:55,  h:45},
    {id:"dresser",  name:"梳妆台",     emoji:"💄", w:120, h:45},
    {id:"tv",       name:"电视",        emoji:"📺", w:90,  h:8},
  ],
  // 次卧
  bed2: [
    {id:"bed150",  name:"双人床1.5m", emoji:"🛏️", w:170, h:210},
    {id:"bed120",  name:"单人床1.2m", emoji:"🛏️", w:130, h:200},
    {id:"wardrobe",name:"衣柜",       emoji:"🗄️", w:160, h:50},
    {id:"desk",    name:"书桌",        emoji:"🖥️", w:130, h:60},
    {id:"nightstand",name:"床头柜",   emoji:"🗄️", w:50,  h:45},
  ],
  // 卧室3
  bed3: [
    {id:"bed120",  name:"单人床1.2m", emoji:"🛏️", w:130, h:200},
    {id:"wardrobe",name:"衣柜",       emoji:"🗄️", w:140, h:50},
    {id:"desk",    name:"书桌",        emoji:"🖥️", w:120, h:55},
  ],
  // 厨房
  kitchen: [
    {id:"counter", name:"操作台",     emoji:"🍳", w:200, h:60},
    {id:"stove",   name:"灶台",       emoji:"🔥", w:80,  h:55},
    {id:"sink",    name:"水槽",       emoji:"🚰", w:80,  h:55},
    {id:"fridge",  name:"冰箱",       emoji:"🧊", w:70,  h:65},
    {id:"hood",    name:"油烟机",     emoji:"💨", w:80,  h:35},
    {id:"cabinet", name:"吊柜",       emoji:"🗄️", w:180, h:35},
  ],
  // 餐厅
  dining: [
    {id:"diningTable", name:"餐桌",   emoji:"🍽️", w:160, h:90},
    {id:"chair",      name:"餐椅",     emoji:"🪑", w:50,  h:50},
    {id:"sideboard",  name:"餐边柜",  emoji:"🗄️", w:140, h:40},
  ],
  // 卫生间
  bath: [
    {id:"toilet",  name:"马桶",      emoji:"🚽", w:45,  h:75},
    {id:"washbasin",name:"洗手台",   emoji:"🚿", w:100, h:45},
    {id:"shower",  name:"淋浴间",     emoji:"🚿", w:100, h:100, isArea:true},
    {id:"mirror",  name:"镜柜",      emoji:"🪞", w:80,  h:30},
  ],
  // 卫2
  bath2: [
    {id:"toilet",  name:"马桶",      emoji:"🚽", w:45,  h:75},
    {id:"washbasin",name:"洗手台",  emoji:"🚿", w:90,  h:45},
    {id:"shower",  name:"淋浴间",    emoji:"🚿", w:90,  h:90, isArea:true},
  ],
  // 书房
  study: [
    {id:"desk",      name:"书桌",      emoji:"🖥️", w:140, h:65},
    {id:"chair",     name:"办公椅",    emoji:"🪑", w:55,  h:55},
    {id:"bookshelf", name:"书架",      emoji:"📚", w:120, h:35},
    {id:"sofa",      name:"休闲沙发",  emoji:"🛋️", w:140, h:75},
  ],
  // 阳台
  balcony: [
    {id:"plant",    name:"绿植",      emoji:"🪴", w:50,  h:50},
    {id:"dryRack",  name:"晾衣架",    emoji:"👕", w:100, h:40},
    {id:"bench",    name:"休闲凳",    emoji:"🪑", w:90,  h:50},
  ],
  // 楼梯间
  stair: [
    {id:"rail",     name:"扶手",      emoji:"⚠️", w:50,  h:30},
  ],
  // 储藏室
  storage: [
    {id:"shelf",    name:"储物架",    emoji:"📦", w:140, h:40},
    {id:"box",      name:"收纳箱",    emoji:"📦", w:60,  h:45},
  ],
};

var canvas = document.getElementById("canvas2d");
var ctx = canvas.getContext("2d");
var EDGE_TH = 22;

function makeDefaultConfig(fi){
  if(fi === 0) return DEFAULT_ROOMS.slice();
  var cfg = DEFAULT_ROOMS.filter(function(r){ return ["living","kitchen","dining"].indexOf(r) < 0; });
  if(cfg.indexOf("masterBed") < 0) cfg.push("masterBed");
  if(cfg.indexOf("bed2") < 0) cfg.push("bed2");
  if(cfg.indexOf("bath") < 0) cfg.push("bath");
  return cfg;
}

var state = {
  width:12, length:10, floorHeight:3.3,
  floors:2, currentFloor:0,
  floorRoomConfigs: [makeDefaultConfig(0), makeDefaultConfig(1)],
  floorData:[], view:"2d", zoom:1, panX:0, panY:0,
  mainDoorWidth: 1.0,
  mainDoors: [
    {wall:"bottom", offset:500, openDir:"out"},
    null, null, null, null
  ],
  selectedRoomId: null  // 当前选中的房间（用于家具配置）
};
var dragState = null, resizeState = null, doorDragState = null, mainDoorDragState = null;
var furnDragState = null;
var canvasSizeEditor = null; // 画布上的悬浮尺寸编辑框
var isPanning = false, panStartX = 0, panStartY = 0;
var T = { scene:null, camera:null, renderer:null, animId:null, orbit:null };

/* ===== 初始化 ===== */
function init(){
  console.log("init called, THREE=", typeof THREE);
  var wrap = document.getElementById("canvasWrapper");
  var dpr = window.devicePixelRatio || 1;
  canvas.width = wrap.clientWidth * dpr;
  canvas.height = wrap.clientHeight * dpr;
  canvas.style.width = wrap.clientWidth + "px";
  canvas.style.height = wrap.clientHeight + "px";
  window.addEventListener("resize", function(){
    var w2 = document.getElementById("canvasWrapper");
    var dpr2 = window.devicePixelRatio || 1;
    canvas.width = w2.clientWidth * dpr2;
    canvas.height = w2.clientHeight * dpr2;
    canvas.style.width = w2.clientWidth + "px";
    canvas.style.height = w2.clientHeight + "px";
    if(state.view==="3d" && T.renderer) on3dResize();
    render();
  });
  canvas.addEventListener("mousedown", on2dDown);
  canvas.addEventListener("mousemove", on2dMove);
  canvas.addEventListener("mouseup", on2dUp);
  canvas.addEventListener("mouseleave", on2dLeave);
  canvas.addEventListener("wheel", on2dWheel, {passive:false});
  canvas.addEventListener("contextmenu", function(e){ e.preventDefault(); });
  renderFloorTabs();
  renderRoomTags();
  generateLayout();
}

/* ===== 坐标工具 ===== */
function getWorldPos(e){
  var rect = canvas.getBoundingClientRect();
  var s = state.zoom * getBaseScale();
  var ox = (rect.width - state.width*100*s)/2 + state.panX;
  var oy = (rect.height - state.length*100*s)/2 + state.panY;
  return { x: (e.clientX - rect.left - ox)/s, y: (e.clientY - rect.top - oy)/s };
}
function getBaseScale(){
  var rect = canvas.getBoundingClientRect();
  return Math.min((rect.width-120)/(state.width*100), (rect.height-120)/(state.length*100));
}
function snap(v){ return Math.round(v/10)*10; }

/* ===== 门位置计算 ===== */
function getDoorPixelPos(r){
  if(!r.door) return null;
  var d = r.door;
  var dw = Math.min(90, r.w * 0.35, r.h * 0.35);
  if(d.wall === "bottom") return { px: r.x + d.offset + dw/2, py: r.y + r.h, wall: "bottom" };
  if(d.wall === "top")    return { px: r.x + d.offset + dw/2, py: r.y, wall: "top" };
  if(d.wall === "left")   return { px: r.x, py: r.y + d.offset + dw/2, wall: "left" };
  if(d.wall === "right")  return { px: r.x + r.w, py: r.y + d.offset + dw/2, wall: "right" };
  return null;
}

/* ===== 入户门位置计算 ===== */
function getMainDoorPixelPos(md){
  if(!md) return null;
  var W = state.width * 100, L = state.length * 100;
  var dw = state.mainDoorWidth * 100;
  if(md.wall === "bottom") return { px: md.offset + dw/2, py: L, wall: "bottom" };
  if(md.wall === "top")    return { px: md.offset + dw/2, py: 0, wall: "top" };
  if(md.wall === "left")   return { px: 0, py: md.offset + dw/2, wall: "left" };
  if(md.wall === "right")  return { px: W, py: md.offset + dw/2, wall: "right" };
  return null;
}

/* ===== 命中测试 ===== */
function hitTestMainDoor(pos){
  var md = state.mainDoors[state.currentFloor];
  if(!md) return null;
  var dp = getMainDoorPixelPos(md);
  if(!dp) return null;
  var th = 40 / (state.zoom * getBaseScale());
  var dx = pos.x - dp.px, dy = pos.y - dp.py;
  if(dx*dx + dy*dy < th*th) return { mainDoor: true };
  return null;
}

function hitTestDoor(pos){
  var fl = state.floorData[state.currentFloor];
  if(!fl) return null;
  var th = 30 / (state.zoom * getBaseScale());
  for(var i=0; i<fl.rooms.length; i++){
    var r = fl.rooms[i];
    if(!r.door) continue;
    var dp = getDoorPixelPos(r);
    if(!dp) continue;
    var dx = pos.x - dp.px, dy = pos.y - dp.py;
    if(dx*dx + dy*dy < th*th) return { room: r, index: i };
  }
  return null;
}

function hitTestFurniture(pos){
  var fl = state.floorData[state.currentFloor];
  if(!fl) return null;
  var s = state.zoom * getBaseScale();
  for(var ri=0; ri<fl.rooms.length; ri++){
    var r = fl.rooms[ri];
    if(!r.furniture) continue;
    for(var fi=0; fi<r.furniture.length; fi++){
      var f = r.furniture[fi];
      var th = 14 / s;
      var cx = r.x + f.px, cy = r.y + f.py;
      var hw = f.w/2 + th, hh = f.h/2 + th;
      if(pos.x >= cx - hw && pos.x <= cx + hw && pos.y >= cy - hh && pos.y <= cy + hh){
        return { room: r, furnIndex: fi };
      }
    }
  }
  return null;
}

function hitTest(pos){
  var fl = state.floorData[state.currentFloor];
  if(!fl) return null;
  var th = EDGE_TH / (state.zoom * getBaseScale());
  for(var i=fl.rooms.length-1; i>=0; i--){
    var r = fl.rooms[i];
    if(pos.x < r.x || pos.x > r.x+r.w || pos.y < r.y || pos.y > r.y+r.h) continue;
    var edge = null;
    if(Math.abs(pos.x - r.x) < th) edge = "left";
    else if(Math.abs(pos.x - (r.x+r.w)) < th) edge = "right";
    else if(Math.abs(pos.y - r.y) < th) edge = "top";
    else if(Math.abs(pos.y - (r.y+r.h)) < th) edge = "bottom";
    return edge ? {room:r, edge:edge} : {room:r, edge:null};
  }
  return null;
}

/* ===== 判断点靠近房间的哪面墙 ===== */
function getNearestWall(r, pos){
  var dBottom = Math.abs(pos.y - (r.y + r.h));
  var dTop = Math.abs(pos.y - r.y);
  var dLeft = Math.abs(pos.x - r.x);
  var dRight = Math.abs(pos.x - (r.x + r.w));
  var min = Math.min(dBottom, dTop, dLeft, dRight);
  if(min === dBottom) return "bottom";
  if(min === dTop) return "top";
  if(min === dLeft) return "left";
  return "right";
}

/* ===== 判断点靠近建筑外墙的哪面 ===== */
function getNearestOuterWall(pos){
  var W = state.width * 100, L = state.length * 100;
  var dBottom = Math.abs(pos.y - L);
  var dTop = Math.abs(pos.y);
  var dLeft = Math.abs(pos.x);
  var dRight = Math.abs(pos.x - W);
  var min = Math.min(dBottom, dTop, dLeft, dRight);
  if(min === dBottom) return "bottom";
  if(min === dTop) return "top";
  if(min === dLeft) return "left";
  return "right";
}

/* ===== 鼠标事件 ===== */
function on2dDown(e){
  if(e.button === 2){ isPanning=true; panStartX=e.clientX-state.panX; panStartY=e.clientY-state.panY; canvas.style.cursor="grabbing"; return; }
  if(e.button !== 0) return;
  var pos = getWorldPos(e);

  // 优先级：家具 > 入户门 > 房间内门 > 房间
  var furnHit = hitTestFurniture(pos);
  if(furnHit){ furnDragState = { room: furnHit.room, furnIndex: furnHit.furnIndex, startX: pos.x, startY: pos.y, origPx: furnHit.room.furniture[furnHit.furnIndex].px, origPy: furnHit.room.furniture[furnHit.furnIndex].py }; return; }

  var mdHit = hitTestMainDoor(pos);
  if(mdHit){ mainDoorDragState = { startX: pos.x, startY: pos.y, origOffset: state.mainDoors[state.currentFloor].offset, origWall: state.mainDoors[state.currentFloor].wall }; return; }

  var dhit = hitTestDoor(pos);
  if(dhit){ doorDragState = { room: dhit.room, index: dhit.index, startX: pos.x, startY: pos.y, origOffset: dhit.room.door.offset, origWall: dhit.room.door.wall }; return; }

  var hit = hitTest(pos);
  if(hit){
    selectRoomForFurniture(hit.room.id);
    if(hit.edge){ resizeState={room:hit.room,edge:hit.edge,sx:pos.x,sy:pos.y,ox:hit.room.x,oy:hit.room.y,ow:hit.room.w,oh:hit.room.h}; }
    else { dragState={room:hit.room,dx:pos.x-hit.room.x,dy:pos.y-hit.room.y}; }
  } else {
    deselectRoom();
  }
}

function on2dMove(e){
  var pos = getWorldPos(e);

  if(furnDragState){
    var ds = furnDragState, r = ds.room, f = r.furniture[ds.furnIndex];
    // 限制在房间边界内
    var nx = pos.x - ds.startX + ds.origPx;
    var ny = pos.y - ds.startY + ds.origPy;
    f.px = Math.max(f.w/2, Math.min(r.w - f.w/2, snap(nx)));
    f.py = Math.max(f.h/2, Math.min(r.h - f.h/2, snap(ny)));
    render(); return;
  }

  if(mainDoorDragState){
    var ds = mainDoorDragState, md = state.mainDoors[state.currentFloor];
    var dw = state.mainDoorWidth * 100;
    var newWall = getNearestOuterWall(pos);
    var W = state.width * 100, L = state.length * 100;
    var newOffset;
    if(newWall === "bottom" || newWall === "top") newOffset = Math.max(10, Math.min(W - dw - 10, snap(pos.x - dw/2)));
    else newOffset = Math.max(10, Math.min(L - dw - 10, snap(pos.y - dw/2)));
    md.wall = newWall; md.offset = newOffset;
    render(); return;
  }

  if(doorDragState){
    var ds = doorDragState, r = ds.room;
    var dw = Math.min(90, r.w*0.35, r.h*0.35);
    var newWall = getNearestWall(r, pos);
    var newOffset;
    if(newWall === "bottom" || newWall === "top") newOffset = Math.max(10, Math.min(r.w - dw - 10, snap(pos.x - r.x - dw/2)));
    else newOffset = Math.max(10, Math.min(r.h - dw - 10, snap(pos.y - r.y - dw/2)));
    r.door.wall = newWall; r.door.offset = newOffset;
    render(); renderRoomList(); return;
  }

  if(isPanning){ state.panX=e.clientX-panStartX; state.panY=e.clientY-panStartY; render(); return; }

  if(resizeState){
    var rs=resizeState, rm=rs.room, ms=150;
    if(rs.edge==="left"){ rm.x=snap(rs.ox+(pos.x-rs.sx)); rm.w=rs.ow-(rm.x-rs.ox); if(rm.w<ms){rm.w=ms;rm.x=rs.ox+rs.ow-ms;} }
    if(rs.edge==="right"){ rm.w=snap(rs.ow+(pos.x-rs.sx)); if(rm.w<ms)rm.w=ms; }
    if(rs.edge==="top"){ rm.y=snap(rs.oy+(pos.y-rs.sy)); rm.h=rs.oh-(rm.y-rs.oy); if(rm.h<ms){rm.h=ms;rm.y=rs.oy+rs.oh-ms;} }
    if(rs.edge==="bottom"){ rm.h=snap(rs.oh+(pos.y-rs.sy)); if(rm.h<ms)rm.h=ms; }
    rm.x=Math.max(0,Math.min(state.width*100-rm.w,rm.x)); rm.y=Math.max(0,Math.min(state.length*100-rm.h,rm.y));
    rm.w=Math.min(rm.w,state.width*100-rm.x); rm.h=Math.min(rm.h,state.length*100-rm.y);
    // 调整家具位置防止越界
    if(rm.furniture) for(var fi=0;fi<rm.furniture.length;fi++){var f=rm.furniture[fi];f.px=Math.max(f.w/2,Math.min(rm.w-f.w/2,f.px));f.py=Math.max(f.h/2,Math.min(rm.h-f.h/2,f.py));}
    render(); renderRoomList(); return;
  }

  if(dragState){
    var nx=snap(pos.x-dragState.dx), ny=snap(pos.y-dragState.dy);
    dragState.room.x=Math.max(0,Math.min(state.width*100-dragState.room.w,nx));
    dragState.room.y=Math.max(0,Math.min(state.length*100-dragState.room.h,ny));
    render(); renderRoomList(); return;
  }

  var furnHit=hitTestFurniture(pos), mdHit=hitTestMainDoor(pos), dhit=hitTestDoor(pos), hit=hitTest(pos), tip=document.getElementById("tooltip");
  if(furnHit){ canvas.style.cursor="move"; var f=furnHit.room.furniture[furnHit.furnIndex]; var cat=getFurnCatalog(furnHit.room.type); var finfo=cat?cat[f.id]||{}:{}; tip.textContent=finfo.name||f.id+"："+Math.round(f.px)+","+Math.round(f.py)+" 拖拽移动"; var rect=canvas.getBoundingClientRect(); tip.style.left=(e.clientX-rect.left+12)+"px"; tip.style.top=(e.clientY-rect.top-28)+"px"; tip.style.display="block"; }
  else if(mdHit){ canvas.style.cursor="move"; tip.textContent="入户大门：拖拽移动到任意外墙"; var rect=canvas.getBoundingClientRect(); tip.style.left=(e.clientX-rect.left+12)+"px"; tip.style.top=(e.clientY-rect.top-28)+"px"; tip.style.display="block"; }
  else if(dhit){ canvas.style.cursor="move"; tip.textContent=dhit.room.name+"门："+dhit.room.door.wall+"墙，拖拽可换墙"; var rect=canvas.getBoundingClientRect(); tip.style.left=(e.clientX-rect.left+12)+"px"; tip.style.top=(e.clientY-rect.top-28)+"px"; tip.style.display="block"; }
  else if(hit){ canvas.style.cursor=hit.edge?((hit.edge==="left"||hit.edge==="right")?"ew-resize":"ns-resize"):"pointer"; tip.textContent=hit.room.name+" "+(hit.room.w/100).toFixed(1)+"×"+(hit.room.h/100).toFixed(1)+"m（点击选房间配家具）"; var rect=canvas.getBoundingClientRect(); tip.style.left=(e.clientX-rect.left+12)+"px"; tip.style.top=(e.clientY-rect.top-28)+"px"; tip.style.display="block"; }
  else { canvas.style.cursor="default"; if(tip)tip.style.display="none"; }
}

function on2dUp(){ dragState=null; resizeState=null; doorDragState=null; mainDoorDragState=null; furnDragState=null; isPanning=false; canvas.style.cursor="default"; hideCanvasSizeEditor(); }
function on2dLeave(){ dragState=null; resizeState=null; doorDragState=null; mainDoorDragState=null; furnDragState=null; isPanning=false; hideCanvasSizeEditor(); var t=document.getElementById("tooltip"); if(t)t.style.display="none"; canvas.style.cursor="default"; }

/* ===== 画布悬浮尺寸编辑框 ===== */
function showCanvasSizeEditor(room){
  hideCanvasSizeEditor();
  if(!room) return;
  var wrap = document.getElementById("canvasWrapper");
  var rect = canvas.getBoundingClientRect();
  var s = state.zoom * getBaseScale();
  var ox = (rect.width - state.width*100*s)/2 + state.panX;
  var oy = (rect.height - state.length*100*s)/2 + state.panY;
  // 编辑框位置：房间下方
  var ex = ox + (room.x + room.w/2)*s;
  var ey = oy + (room.y + room.h + 18)*s;
  
  var el = document.createElement("div");
  el.id = "canvasSizeEditor";
  el.cssText = "";
  el.style.cssText = "position:absolute;left:"+(ex-90)+"px;top:"+ey+"px;z-index:50;display:flex;align-items:center;gap:4px;background:#fff;border:1px solid #00b894;border-radius:6px;padding:5px 10px;box-shadow:0 3px 12px rgba(0,0,0,0.15);font-family:'Microsoft YaHei',sans-serif;";
  el.innerHTML = '<span style=\'font-size:11px;color:#999\'>宽</span>'
    + '<input type="number" id="cseW" style="width:56px;padding:3px 4px;border:1px solid #d0d0d0;border-radius:4px;font-size:12px;text-align:center;outline:none;color:#333;font-family:inherit" value="'+(room.w/100).toFixed(1)+'" step="0.1" min="0.5" max="30">'
    + '<span style=\'font-size:11px;color:#999\'>×</span>'
    + '<span style=\'font-size:11px;color:#999\'>深</span>'
    + '<input type="number" id="cseH" style="width:56px;padding:3px 4px;border:1px solid #d0d0d0;border-radius:4px;font-size:12px;text-align:center;outline:none;color:#333;font-family:inherit" value="'+(room.h/100).toFixed(1)+'" step="0.1" min="0.5" max="30">'
    + '<span style=\'font-size:11px;color:#aaa\'>m</span>'
    + '<button id="cseOk" style="margin-left:4px;padding:3px 10px;background:#00b894;color:#fff;border:none;border-radius:4px;font-size:11px;cursor:pointer;font-family:inherit">✓</button>';
  wrap.appendChild(el);
  
  var wInput = document.getElementById("cseW");
  var hInput = document.getElementById("cseH");
  var okBtn = document.getElementById("cseOk");
  
  canvasSizeEditor = { room: room, el: el };
  
  function applySize(){
    var nw = parseFloat(wInput.value); var nh = parseFloat(hInput.value);
    if(isNaN(nw)||nw<0.5) nw=0.5; if(nw>30) nw=30;
    if(isNaN(nh)||nh<0.5) nh=0.5; if(nh>30) nh=30;
    room.w = Math.min(nw*100, state.width*100 - room.x);
    room.h = Math.min(nh*100, state.length*100 - room.y);
    render(); renderRoomList();
  }
  okBtn.onclick = applySize;
  wInput.onchange = applySize;
  hInput.onchange = applySize;
  // 回车确认
  wInput.onkeydown = function(e){ if(e.key==="Enter"){ hInput.focus(); e.preventDefault(); } };
  hInput.onkeydown = function(e){ if(e.key==="Enter"){ applySize(); e.preventDefault(); } };
  // 阻止事件冒泡到canvas
  el.onmousedown = function(e){ e.stopPropagation(); };
  el.onwheel = function(e){ e.stopPropagation(); };
}

function hideCanvasSizeEditor(){
  if(canvasSizeEditor && canvasSizeEditor.el && canvasSizeEditor.el.parentNode){
    canvasSizeEditor.el.parentNode.removeChild(canvasSizeEditor.el);
  }
  canvasSizeEditor = null;
}
function on2dWheel(e){ e.preventDefault(); state.zoom=Math.max(0.15,Math.min(6,state.zoom*(e.deltaY>0?0.92:1.08))); render(); }

/* ===== 家具辅助函数 ===== */
function getFurnCatalog(roomType){ return FURNITURE_CATALOG[roomType] || []; }

function selectRoomForFurniture(roomId){
  state.selectedRoomId = roomId;
  document.getElementById("selectedRoomHint").style.display = "inline";
  document.getElementById("furnitureSection").style.display = "block";
  renderRoomList();
  renderFurniturePanel();
  // 显示画布悬浮尺寸编辑框
  var room = getSelectedRoom();
  if(room) showCanvasSizeEditor(room);
}

function deselectRoom(){
  state.selectedRoomId = null;
  document.getElementById("selectedRoomHint").style.display = "none";
  document.getElementById("furnitureSection").style.display = "none";
  hideCanvasSizeEditor();
  renderRoomList();
}

function getSelectedRoom(){
  if(!state.selectedRoomId) return null;
  var fl = state.floorData[state.currentFloor];
  if(!fl) return null;
  for(var i=0; i<fl.rooms.length; i++){
    if(fl.rooms[i].id === state.selectedRoomId) return fl.rooms[i];
  }
  return null;
}

function addFurnitureToRoom(furnId){
  var room = getSelectedRoom();
  if(!room) return;
  var catalog = getFurnCatalog(room.type);
  var template = null;
  for(var i=0; i<catalog.length; i++){
    if(catalog[i].id === furnId){ template = catalog[i]; break; }
  }
  if(!template) return;
  if(!room.furniture) room.furniture = [];
  // 自动放置在房间中心附近（避免重叠）
  var placed = false;
  for(var attempt=0; attempt<20 && !placed; attempt++){
    var px = room.w/2 + (Math.random()-0.5)*room.w*0.4;
    var py = room.h/2 + (Math.random()-0.5)*room.h*0.4;
    px = Math.max(template.w/2, Math.min(room.w - template.w/2, px));
    py = Math.max(template.h/2, Math.min(room.h - template.h/2, py));
    // 简单重叠检测
    var overlap = false;
    for(var fi=0; fi<room.furniture.length; fi++){
      var f = room.furniture[fi];
      if(Math.abs(f.px - px) < (f.w + template.w)/2 + 5 && Math.abs(f.py - py) < (f.h + template.h)/2 + 5){
        overlap = true; break;
      }
    }
    if(!overlap){
      room.furniture.push({id: furnId, px: snap(px), py: snap(py), w: template.w, h: template.h});
      placed = true;
    }
  }
  if(!placed){
    // 强制添加
    room.furniture.push({id: furnId, px: snap(room.w/2), py: snap(room.h/2), w: template.w, h: template.h});
  }
  renderFurniturePanel();
  renderRoomList();
  render();
}

function removeFurnitureFromRoom(furnIndex){
  var room = getSelectedRoom();
  if(!room || !room.furniture) return;
  room.furniture.splice(furnIndex, 1);
  renderFurniturePanel();
  renderRoomList();
  render();
}

function renderFurniturePanel(){
  var room = getSelectedRoom();
  var el = document.getElementById("furnitureList");
  if(!room){ el.innerHTML = ""; return; }
  var catalog = getFurnCatalog(room.type);
  var html = "";
  // 当前房间已有家具
  if(room.furniture && room.furniture.length > 0){
    html += '<div style="font-size:10px;color:#8892a8;margin-bottom:5px">已摆放：</div>';
    html += '<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:10px">';
    for(var fi=0; fi<room.furniture.length; fi++){
      var f = room.furniture[fi];
      var cat = getFurnCatalog(room.type);
      var info = null; for(var ci=0;ci<cat.length;ci++) if(cat[ci].id===f.id){info=cat[ci];break;}
      html += '<div style="display:inline-flex;align-items:center;gap:4px;padding:3px 7px;border-radius:5px;background:#1a2236;border:1px solid #2a3550;font-size:11px">'
        + (info?info.emoji:"🪑") + '<span style="color:#e8edf5">'+(info?info.name:f.id)+'</span>'
        + '<button onclick="removeFurnitureFromRoom('+fi+')" style="width:16px;height:16px;border:none;background:#2a3550;color:#8892a8;border-radius:3px;cursor:pointer;font-size:9px;line-height:1;padding:0">✕</button></div>';
    }
    html += '</div>';
  }
  // 可选家具
  html += '<div style="font-size:10px;color:#8892a8;margin-bottom:5px">添加家具：</div>';
  html += '<div style="display:flex;flex-wrap:wrap;gap:5px">';
  for(var i=0; i<catalog.length; i++){
    var f = catalog[i];
    html += '<div class="furn-item" onclick="addFurnitureToRoom(\''+f.id+'\')" title="'+f.name+' ('+(f.w/100).toFixed(1)+'×'+(f.h/100).toFixed(1)+'m)">'
      + '<span style="font-size:20px;line-height:1">'+f.emoji+'</span>'
      + '<span style="font-size:10px;color:#8892a8;white-space:nowrap">'+f.name+'</span></div>';
  }
  html += '</div>';
  el.innerHTML = html;
}

/* ===== UI ===== */
function renderRoomTags(){
  var html="", cfg=state.floorRoomConfigs[state.currentFloor]||[];
  for(var i=0;i<ROOM_TYPES.length;i++){ var r=ROOM_TYPES[i], active=cfg.indexOf(r.id)>=0; html+='<div class="room-tag'+(active?" active":"")+'" onclick="toggleRoom(\''+r.id+'\')">'+r.name+'</div>'; }
  document.getElementById("roomTags").innerHTML=html;
}
function toggleRoom(id){
  while(state.floorRoomConfigs.length<=state.currentFloor) state.floorRoomConfigs.push(makeDefaultConfig(state.floorRoomConfigs.length));
  var cfg=state.floorRoomConfigs[state.currentFloor], idx=cfg.indexOf(id);
  if(idx>=0)cfg.splice(idx,1); else cfg.push(id);
  renderRoomTags();
}
function changeFloors(d){
  state.floors=Math.max(1,Math.min(5,state.floors+d));
  document.getElementById("floorsCount").textContent=state.floors;
  while(state.floorRoomConfigs.length<state.floors) state.floorRoomConfigs.push(makeDefaultConfig(state.floorRoomConfigs.length));
  state.floorRoomConfigs=state.floorRoomConfigs.slice(0,state.floors);
  while(state.floorData.length<state.floors) state.floorData.push({rooms:[]});
  state.floorData=state.floorData.slice(0,state.floors);
  while(state.mainDoors.length<state.floors) state.mainDoors.push(null);
  state.mainDoors=state.mainDoors.slice(0,state.floors);
  if(state.currentFloor>=state.floors) state.currentFloor=state.floors-1;
  deselectRoom();
  renderFloorTabs(); renderRoomTags(); renderRoomList(); render();
}
function renderFloorTabs(){
  var el=document.getElementById("floorTabs"); el.innerHTML="";
  for(var i=0;i<state.floors;i++){ el.appendChild((function(idx){ var t=document.createElement("div"); t.className="floor-tab"+(idx===state.currentFloor?" active":""); t.textContent=(idx+1)+"F"; t.onclick=function(){ state.currentFloor=idx; deselectRoom(); renderFloorTabs(); renderRoomTags(); renderRoomList(); render(); }; return t; })(i)); }
}
function cycleDoor(i){
  var r=state.floorData[state.currentFloor].rooms[i], walls=["bottom","top","left","right"], ci=walls.indexOf(r.door?r.door.wall:"bottom");
  r.door={wall:walls[(ci+1)%4], offset:Math.min(80,(r.w||200)/2)};
  renderRoomList(); render();
}
function toggleMainDoor(){
  var md = state.mainDoors[state.currentFloor];
  if(md) state.mainDoors[state.currentFloor] = null;
  else state.mainDoors[state.currentFloor] = {wall:"bottom", offset:state.width*50-state.mainDoorWidth*50, openDir:"out"};
  renderRoomList(); render();
}
function setMainDoorWidth(v){
  state.mainDoorWidth = Math.max(0.6, Math.min(3.0, parseFloat(v)||1.0));
  document.getElementById("mainDoorWidthVal").textContent = state.mainDoorWidth.toFixed(1)+"m";
  var md = state.mainDoors[state.currentFloor];
  if(md){
    var dw = state.mainDoorWidth * 100;
    var W = state.width * 100, L = state.length * 100;
    var maxOff = (md.wall==="bottom"||md.wall==="top") ? W - dw - 10 : L - dw - 10;
    md.offset = Math.max(10, Math.min(maxOff, md.offset));
  }
  render();
}
function renderRoomList(){
  var el=document.getElementById("roomList"), fl=state.floorData[state.currentFloor];
  if(!fl){el.innerHTML="";return;}
  var html="";
  var hasMainDoor = !!state.mainDoors[state.currentFloor];
  html+='<div class="room-list-item" style="background:rgba(0,212,170,0.1);border-color:#00d4aa"><div class="room-info"><div class="color-dot" style="background:#00d4aa"></div><span class="room-name">入户大门</span><span class="room-size">'+(hasMainDoor?state.mainDoorWidth.toFixed(1)+"m宽":"未设置")+'</span></div><div class="room-actions">';
  if(hasMainDoor){
    html+='<button onclick="setMainDoorWidth(Math.max(0.6,state.mainDoorWidth-0.2))">◀</button><span id="mainDoorWidthVal" style="font-size:11px;min-width:36px;text-align:center;display:inline-block">'+state.mainDoorWidth.toFixed(1)+'m</span><button onclick="setMainDoorWidth(Math.min(3.0,state.mainDoorWidth+0.2))">▶</button>';
  }
  html+='<button onclick="toggleMainDoor()">'+(hasMainDoor?"移除":"添加")+'</button></div></div>';
  for(var i=0;i<fl.rooms.length;i++){
    var r=fl.rooms[i];
    var isSelected = (r.id === state.selectedRoomId);
    var furnCount = (r.furniture && r.furniture.length > 0) ? ' ['+r.furniture.length+'件家具]' : '';
    var dl=r.door?r.door.wall+"墙":"无门";
    html+='<div class="room-list-item'+(isSelected?' selected':'')+'" onclick="selectRoomForFurniture(\''+r.id+'\')"><div class="room-info"><div class="color-dot" style="background:'+r.color+'"></div><span class="room-name">'+r.name+'</span></div></div>';
    html+='<div style="display:flex;align-items:center;gap:4px;padding:2px 9px 4px;margin-bottom:5px;"><span style="font-size:11px;color:#999">宽:</span><input type="number" style="width:52px;padding:2px 4px;border:1px solid #d0d0d0;border-radius:3px;font-size:11px;text-align:center;outline:none;" value="'+(r.w/100).toFixed(1)+'" step="0.1" min="1" max="30" onchange="setRoomSize('+i+',\'w\',this.value)" onclick="event.stopPropagation()" onfocus="event.stopPropagation()"><span style="font-size:11px;color:#999;margin-left:4px">深:</span><input type="number" style="width:52px;padding:2px 4px;border:1px solid #d0d0d0;border-radius:3px;font-size:11px;text-align:center;outline:none;" value="'+(r.h/100).toFixed(1)+'" step="0.1" min="1" max="30" onchange="setRoomSize('+i+',\'h\',this.value)" onclick="event.stopPropagation()" onfocus="event.stopPropagation()"><span style="font-size:11px;color:#999;margin-left:6px">['+dl+']</span>'+'<span style="color:#00d4aa;font-size:10px">'+furnCount+'</span>'+'<div class="room-actions" style="margin-left:auto"><button onclick="event.stopPropagation();cycleDoor('+i+')">🚪</button><button onclick="event.stopPropagation();deleteRoom('+i+')">✕</button></div></div>';
  }
  el.innerHTML=html;
}
function setRoomSize(idx, dim, val){
  var rooms = state.floorData[state.currentFloor].rooms;
  var r = rooms[idx]; if(!r) return;
  var v = parseFloat(val); if(isNaN(v) || v < 1) v = 1; if(v > 30) v = 30;
  var newVal = v * 100;
  if(dim === 'w'){
    var maxX = state.width * 100 - r.x;
    r.w = Math.min(newVal, maxX);
  } else {
    var maxY = state.length * 100 - r.y;
    r.h = Math.min(newVal, maxY);
  }
  renderRoomList(); render();
}
function deleteRoom(i){
  var r = state.floorData[state.currentFloor].rooms[i];
  if(r.id === state.selectedRoomId) deselectRoom();
  state.floorData[state.currentFloor].rooms.splice(i,1);
  renderRoomList(); render();
}

/* ===== 生成布局 ===== */
function generateLayout(){
  state.width=parseFloat(document.getElementById("widthInput").value)||12;
  state.length=parseFloat(document.getElementById("lengthInput").value)||10;
  state.floorHeight=parseFloat(document.getElementById("heightInput").value)||3.3;
  state.floorData=[];
  for(var f=0;f<state.floors;f++) state.floorData.push({rooms:genFloor(f)});
  state.mainDoors = [{wall:"bottom", offset:state.width*50-state.mainDoorWidth*50, openDir:"out"}, null, null, null, null].slice(0, state.floors);
  deselectRoom();
  state.currentFloor=0; state.zoom=1; state.panX=0; state.panY=0;
  renderFloorTabs(); renderRoomTags(); renderRoomList(); render();
}
function genFloor(fi){
  var W=state.width*100, L=state.length*100, en=(state.floorRoomConfigs[fi]||[]).slice();
  if(en.length===0) return [];
  var tr=0; for(var i=0;i<en.length;i++){ var rt=findRoomType(en[i]); tr+=rt?rt.ratio:0.05; }
  var defs=[]; for(var i=0;i<en.length;i++){ var rt=findRoomType(en[i]); if(rt) defs.push({id:rt.id,name:rt.name,color:rt.color,minArea:rt.minArea,ta:(rt.ratio/tr)*W*L}); }
  var rooms=pack(defs,W,L);
  for(var i=0;i<rooms.length;i++){
    rooms[i].door={wall:"bottom",offset:Math.max(10,rooms[i].w/2-Math.min(45,rooms[i].w*0.15))};
    rooms[i].furniture=[]; // 初始化家具数组
  }
  return rooms;
}
function findRoomType(id){ for(var i=0;i<ROOM_TYPES.length;i++) if(ROOM_TYPES[i].id===id) return ROOM_TYPES[i]; return null; }
function pack(defs,W,L){
  var rooms=[], rects=[{x:0,y:0,w:W,h:L}], sorted=defs.slice().sort(function(a,b){return b.ta-a.ta;});
  for(var di=0;di<sorted.length;di++){
    var d=sorted[di], best=null, bestWaste=Infinity;
    for(var ri=0;ri<rects.length;ri++){
      var r=rects[ri]; if(r.w*r.h<d.minArea*10000*0.65)continue;
      var rw=Math.sqrt(d.ta*1.3), rh=d.ta/rw;
      if(rw>r.w){rw=r.w*0.93;rh=d.ta/rw;} if(rh>r.h){rh=r.h*0.93;rw=d.ta/rh;}
      if(rw<140||rh<140)continue;
      var waste=r.w*r.h-rw*rh; if(waste>=0&&waste<bestWaste){bestWaste=waste;best={x:r.x,y:r.y,w:rw,h:rh};}
    }
    if(!best){ for(var ri=0;ri<rects.length;ri++){ if(rects[ri].w*rects[ri].h>d.minArea*10000*0.45){ best={x:rects[ri].x,y:rects[ri].y,w:Math.min(rects[ri].w,280),h:Math.min(rects[ri].h,280)}; break; } } }
    if(best){
      var rw=snap(best.w), rh=snap(best.h);
      rooms.push({id:d.id+"_"+rooms.length,type:d.id,name:d.name,color:d.color,x:snap(best.x),y:snap(best.y),w:Math.max(rw,180),h:Math.max(rh,180)});
      for(var ri=0;ri<rects.length;ri++){ if(rects[ri].x===best.x&&rects[ri].y===best.y&&rects[ri].w>=best.w&&rects[ri].h>=best.h){ var br=rects.splice(ri,1)[0]; if(br.x+best.w<br.x+br.w-8)rects.push({x:br.x+best.w,y:br.y,w:br.w-best.w,h:br.h}); if(br.y+best.h<br.y+br.h-8)rects.push({x:br.x,y:br.y+best.h,w:best.w,h:br.h-best.h}); break; } }
    }
  }
  return rooms;
}

/* ===== 2D 渲染 ===== */
function render(){
  if(state.view==="2d") render2D();
  else if(state.view==="3d"){ if(T.scene){ build3D(); } else { console.log("3D not ready, THREE=", typeof THREE); } }
}
function render2D(){
  var dpr=window.devicePixelRatio||1, cw=canvas.width/dpr, ch=canvas.height/dpr;
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.clearRect(0,0,cw,ch);
  var W=state.width*100, L=state.length*100, s=state.zoom*getBaseScale();
  var ox=(cw-W*s)/2+state.panX, oy=(ch-L*s)/2+state.panY;
  ctx.save(); ctx.translate(ox,oy); ctx.scale(s,s);
  ctx.strokeStyle="rgba(42,53,80,0.35)"; ctx.lineWidth=0.5/s;
  for(var x=0;x<=W;x+=50){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,L);ctx.stroke();}
  for(var y=0;y<=L;y+=50){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  ctx.strokeStyle="#00d4aa"; ctx.lineWidth=5/s; ctx.strokeRect(0,0,W,L);
  ctx.fillStyle="rgba(0,212,170,0.05)"; ctx.fillRect(-2/s,-2/s,W+4/s,L+4/s);
  // 外围总尺寸标注（上、左）
  ctx.fillStyle="#00b894"; ctx.font="bold "+(18/s)+"px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="bottom";
  // 上方宽度：用背景条突出显示，避免被compass遮挡
  var tw = ctx.measureText(state.width+"m").width + 16/s;
  ctx.fillStyle="rgba(0,184,148,0.08)"; ctx.fillRect(W/2 - tw/2, -26/s, tw, 22/s);
  ctx.fillStyle="#00b894"; ctx.font="bold "+(17/s)+"px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle";
  ctx.fillText(state.width+"m",W/2,-15/s);
  // 左侧深度
  ctx.save(); ctx.translate(-18/s,L/2); ctx.rotate(-Math.PI/2);
  var tl = ctx.measureText(state.length+"m").width + 16/s;
  ctx.fillStyle="rgba(0,184,148,0.08)"; ctx.fillRect(-tl/2, -11/s, tl, 22/s);
  ctx.fillStyle="#00b894"; ctx.font="bold "+(17/s)+"px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle";
  ctx.fillText(state.length+"m",0,0); ctx.restore();
  drawCompass(s, W, L, true);
  var fl=state.floorData[state.currentFloor];
  if(fl){
    for(var i=0;i<fl.rooms.length;i++){
      var r=fl.rooms[i];
      var isSelected = (r.id === state.selectedRoomId);
      ctx.fillStyle=r.color+"18"; ctx.fillRect(r.x,r.y,r.w,r.h);
      ctx.strokeStyle=r.color+"99"; ctx.lineWidth=2/s; ctx.strokeRect(r.x,r.y,r.w,r.h);
      // 选中高亮
      if(isSelected){ ctx.strokeStyle="#00d4aa"; ctx.lineWidth=3/s; ctx.strokeRect(r.x-1/s,r.y-1/s,r.w+2/s,r.h+2/s); }
      drawDoor2D(r,s);
      drawFurnitureInRoom(r,s);
      ctx.fillStyle=r.color+"cc"; ctx.font="bold "+(18/s)+"px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle";
      ctx.fillText(r.name,r.x+r.w/2,r.y+r.h/2-9/s);
      ctx.fillStyle=r.color+"88"; ctx.font=(14/s)+"px sans-serif";
      ctx.fillText((r.w/100).toFixed(1)+"×"+(r.h/100).toFixed(1)+"m",r.x+r.w/2,r.y+r.h/2+11/s);
    }
  }
  drawMainDoor2D(s);
  ctx.restore();
  document.getElementById("scaleText").textContent=((50/(s*100)).toFixed(1)+"m");
}

function drawFurnitureInRoom(r, s){
  if(!r.furniture || r.furniture.length === 0) return;
  var catalog = getFurnCatalog(r.type);
  for(var fi=0; fi<r.furniture.length; fi++){
    var f = r.furniture[fi];
    var info = null;
    for(var ci=0; ci<catalog.length; ci++){
      if(catalog[ci].id === f.id){ info = catalog[ci]; break; }
    }
    var emoji = info ? info.emoji : "🪑";
    var isArea = info && info.isArea;
    ctx.save();
    if(isArea){
      ctx.fillStyle = "rgba(200,200,200,0.12)";
      ctx.fillRect(r.x + f.px - f.w/2, r.y + f.py - f.h/2, f.w, f.h);
      ctx.strokeStyle = "rgba(200,200,200,0.3)";
      ctx.lineWidth = 1/s;
      ctx.setLineDash([4/s, 3/s]);
      ctx.strokeRect(r.x + f.px - f.w/2, r.y + f.py - f.h/2, f.w, f.h);
      ctx.setLineDash([]);
    } else {
      // 家具背景
      ctx.fillStyle = "rgba(255,255,255,0.12)";
      ctx.fillRect(r.x + f.px - f.w/2, r.y + f.py - f.h/2, f.w, f.h);
      ctx.strokeStyle = "rgba(255,255,255,0.25)";
      ctx.lineWidth = 0.8/s;
      ctx.strokeRect(r.x + f.px - f.w/2, r.y + f.py - f.h/2, f.w, f.h);
    }
    // Emoji 文字
    ctx.font = Math.max(14, f.h * 0.7) + "px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.fillText(emoji, r.x + f.px, r.y + f.py);
    ctx.restore();
  }
}

function drawDoor2D(r,s){
  var d=r.door; if(!d) return;
  var dw=Math.min(90,r.w*0.35,r.h*0.35);
  ctx.save(); ctx.lineWidth=2.5/s;
  if(d.wall==="bottom"){
    var dx=r.x+d.offset;
    ctx.strokeStyle="rgba(255,255,220,0.95)"; ctx.beginPath(); ctx.moveTo(dx,r.y+r.h); ctx.lineTo(dx,r.y+r.h+14/s); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(dx+dw,r.y+r.h); ctx.lineTo(dx+dw,r.y+r.h+14/s); ctx.stroke();
    ctx.strokeStyle="rgba(255,224,102,0.95)"; ctx.setLineDash([5/s,4/s]);
    ctx.beginPath(); ctx.arc(dx,r.y+r.h,dw,-Math.PI/2,0); ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle="rgba(255,224,102,0.85)"; ctx.beginPath(); ctx.moveTo(dx,r.y+r.h); ctx.lineTo(dx+dw,r.y+r.h); ctx.stroke();
    ctx.fillStyle="rgba(255,224,102,0.9)"; ctx.beginPath(); ctx.arc(dx+dw,r.y+r.h,3/s,0,Math.PI*2); ctx.fill();
  }
  if(d.wall==="top"){
    var dx=r.x+d.offset;
    ctx.strokeStyle="rgba(255,255,220,0.95)"; ctx.beginPath(); ctx.moveTo(dx,r.y); ctx.lineTo(dx,r.y-14/s); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(dx+dw,r.y); ctx.lineTo(dx+dw,r.y-14/s); ctx.stroke();
    ctx.strokeStyle="rgba(255,224,102,0.95)"; ctx.setLineDash([5/s,4/s]);
    ctx.beginPath(); ctx.arc(dx+dw,r.y,dw,Math.PI/2,Math.PI); ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle="rgba(255,224,102,0.85)"; ctx.beginPath(); ctx.moveTo(dx,r.y); ctx.lineTo(dx+dw,r.y); ctx.stroke();
    ctx.fillStyle="rgba(255,224,102,0.9)"; ctx.beginPath(); ctx.arc(dx,r.y,3/s,0,Math.PI*2); ctx.fill();
  }
  if(d.wall==="left"){
    var dy=r.y+d.offset;
    ctx.strokeStyle="rgba(255,255,220,0.95)"; ctx.beginPath(); ctx.moveTo(r.x,dy); ctx.lineTo(r.x-14/s,dy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(r.x,dy+dw); ctx.lineTo(r.x-14/s,dy+dw); ctx.stroke();
    ctx.strokeStyle="rgba(255,224,102,0.95)"; ctx.setLineDash([5/s,4/s]);
    ctx.beginPath(); ctx.arc(r.x,dy+dw,dw,Math.PI,Math.PI*1.5); ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle="rgba(255,224,102,0.85)"; ctx.beginPath(); ctx.moveTo(r.x,dy); ctx.lineTo(r.x,dy+dw); ctx.stroke();
    ctx.fillStyle="rgba(255,224,102,0.9)"; ctx.beginPath(); ctx.arc(r.x,dy+dw,3/s,0,Math.PI*2); ctx.fill();
  }
  if(d.wall==="right"){
    var dy=r.y+d.offset;
    ctx.strokeStyle="rgba(255,255,220,0.95)"; ctx.beginPath(); ctx.moveTo(r.x+r.w,dy); ctx.lineTo(r.x+r.w+14/s,dy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(r.x+r.w,dy+dw); ctx.lineTo(r.x+r.w+14/s,dy+dw); ctx.stroke();
    ctx.strokeStyle="rgba(255,224,102,0.95)"; ctx.setLineDash([5/s,4/s]);
    ctx.beginPath(); ctx.arc(r.x+r.w,dy,dw,-Math.PI/2,0); ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle="rgba(255,224,102,0.85)"; ctx.beginPath(); ctx.moveTo(r.x+r.w,dy); ctx.lineTo(r.x+r.w,dy+dw); ctx.stroke();
    ctx.fillStyle="rgba(255,224,102,0.9)"; ctx.beginPath(); ctx.arc(r.x+r.w,dy,3/s,0,Math.PI*2); ctx.fill();
  }
  ctx.restore();
}

function drawMainDoor2D(s){
  var md = state.mainDoors[state.currentFloor];
  if(!md) return;
  var W = state.width * 100, L = state.length * 100;
  var dw = state.mainDoorWidth * 100;
  var dx, dy;
  if(md.wall === "bottom"){ dx = md.offset; dy = L; }
  else if(md.wall === "top"){ dx = md.offset; dy = 0; }
  else if(md.wall === "left"){ dx = 0; dy = md.offset; }
  else { dx = W; dy = md.offset; }
  ctx.save(); ctx.lineWidth = 3/s;
  ctx.strokeStyle = "#00d4aa";
  ctx.fillStyle = "rgba(0,212,170,0.3)";
  if(md.wall === "bottom" || md.wall === "top"){
    var yBase = md.wall === "bottom" ? dy + 5/s : dy - 5/s;
    ctx.fillRect(dx, Math.min(dy, yBase), dw, Math.abs(yBase - dy) + 20/s);
    ctx.strokeRect(dx, Math.min(dy, yBase), dw, Math.abs(yBase - dy) + 20/s);
    ctx.strokeStyle = "#00d4aa"; ctx.setLineDash([4/s, 3/s]);
    ctx.beginPath();
    if(md.wall === "bottom") ctx.arc(dx, dy, dw, -Math.PI/2, 0);
    else ctx.arc(dx + dw, dy, dw, Math.PI/2, Math.PI);
    ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = "#00d4aa";
    ctx.beginPath(); ctx.arc(md.wall === "bottom" ? dx + dw - 15 : dx + 15, dy + (md.wall === "bottom" ? 10 : -10), 4/s, 0, Math.PI*2); ctx.fill();
  } else {
    var xBase = md.wall === "left" ? dx - 5/s : dx + 5/s;
    ctx.fillRect(Math.min(dx, xBase), dy, Math.abs(xBase - dx) + 20/s, dw);
    ctx.strokeRect(Math.min(dx, xBase), dy, Math.abs(xBase - dx) + 20/s, dw);
    ctx.strokeStyle = "#00d4aa"; ctx.setLineDash([4/s, 3/s]);
    ctx.beginPath();
    if(md.wall === "left") ctx.arc(dx, dy + dw, dw, Math.PI, Math.PI*1.5);
    else ctx.arc(dx, dy, dw, -Math.PI/2, 0);
    ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = "#00d4aa";
    ctx.beginPath(); ctx.arc(dx + (md.wall === "left" ? -10 : 10), dy + dw - 15, 4/s, 0, Math.PI*2); ctx.fill();
  }
  ctx.fillStyle = "#00d4aa"; ctx.font = "bold "+(16/s)+"px sans-serif"; ctx.textAlign = "center";
  var labelX = md.wall === "left" ? dx - 25/s : (md.wall === "right" ? dx + 25/s : dx + dw/2);
  var labelY = md.wall === "top" ? dy - 15/s : (md.wall === "bottom" ? dy + 35/s : dy + dw/2);
  ctx.fillText("大门", labelX, labelY);
  ctx.restore();
}

function drawCompass(s, W, L, pushOut){
  var compassSize = 22/s;
  var off = pushOut ? 50 : 42;
  ctx.save();
  ctx.font = "bold " + compassSize + "px sans-serif";
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillStyle = "#8899aa";
  // 北 — 放到右上角区域，远离顶部宽度标注
  ctx.fillText("↑北", W + off/s - 8/s, -off/s + 12/s);
  // 南
  ctx.fillText("↓南", W + off/s - 8/s, L + off/s - 8/s);
  // 东
  ctx.fillText("→东", W + off/s + 6/s, L/2);
  // 西
  ctx.fillText("←西", -off/s - 6/s, L/2);
  ctx.restore();
}

/* ===== 视图切换 ===== */
function switchView(view){
  state.view = view;
  var tabs = document.querySelectorAll(".view-tab");
  for(var i=0; i<tabs.length; i++){ tabs[i].classList.toggle("active", (i===0&&view==="2d") || (i===1&&view==="3d")); }
  document.getElementById("canvas2d").style.display = (view==="2d") ? "block" : "none";
  document.getElementById("view3d").style.display = (view==="3d") ? "block" : "none";
  document.getElementById("hint2d").style.display = (view==="2d") ? "block" : "none";
  document.getElementById("hint3d").style.display = (view==="3d") ? "block" : "none";
  if(view === "3d"){
    if(typeof THREE === "undefined"){ console.error("Three.js not loaded"); return; }
    if(!T.scene) init3D();
    else { on3dResize(); build3D(); if(!T.animId) animate3D(); }
  } else {
    destroy3D();
  }
}

/* ===== THREE.JS 3D ===== */
function init3D(){
  if(typeof THREE === "undefined"){ console.error("Three.js not loaded"); return; }
  console.log("init3D start");
  var container = document.getElementById("view3d");
  T.container = container;
  T.scene = new THREE.Scene();
  T.scene.background = new THREE.Color(0x87CEEB);
  T.scene.fog = new THREE.FogExp2(0x87CEEB, 0.006);
  var aspect = Math.max(container.clientWidth,200) / Math.max(container.clientHeight,200);
  T.camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 200);
  T.camera.position.set(22, 20, 22);
  T.renderer = new THREE.WebGLRenderer({antialias:true, alpha:false});
  T.renderer.setSize(container.clientWidth, container.clientHeight);
  T.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1, 2));
  T.renderer.shadowMap.enabled = true;
  T.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  T.renderer.toneMapping = THREE.ACESFilmicToneMapping;
  T.renderer.toneMappingExposure = 1.1;
  container.appendChild(T.renderer.domElement);
  var amb = new THREE.AmbientLight(0x8899bb, 0.5);
  T.scene.add(amb);
  var hemi = new THREE.HemisphereLight(0x87CEEB, 0x445533, 0.4);
  T.scene.add(hemi);
  var dir = new THREE.DirectionalLight(0xfff5e0, 1.3);
  dir.position.set(18, 30, 16);
  dir.castShadow = true;
  dir.shadow.mapSize.set(2048, 2048);
  dir.shadow.camera.near = 0.5;
  dir.shadow.camera.far = 100;
  dir.shadow.camera.left = -30;
  dir.shadow.camera.right = 30;
  dir.shadow.camera.top = 30;
  dir.shadow.camera.bottom = -30;
  T.scene.add(dir);
  T.dirLight = dir;
  var gCanvas = document.createElement("canvas");
  gCanvas.width = 512; gCanvas.height = 512;
  var gCtx = gCanvas.getContext("2d");
  var gGrad = gCtx.createRadialGradient(256,256,0,256,256,360);
  gGrad.addColorStop(0, "#3a6a3a"); gGrad.addColorStop(0.6, "#2a5a2a"); gGrad.addColorStop(1, "#1a3a1a");
  gCtx.fillStyle = gGrad; gCtx.fillRect(0,0,512,512);
  for(var i=0;i<12000;i++){ gCtx.fillStyle=Math.random()>0.5?"rgba(50,100,50,0.25)":"rgba(40,80,40,0.18)"; gCtx.fillRect(Math.random()*512,Math.random()*512,2+Math.random()*2,1+Math.random()); }
  var gTex = new THREE.CanvasTexture(gCanvas);
  gTex.wrapS = THREE.RepeatWrapping; gTex.wrapT = THREE.RepeatWrapping; gTex.repeat.set(3,3);
  var gMat = new THREE.MeshStandardMaterial({map:gTex, roughness:0.95});
  var gMesh = new THREE.Mesh(new THREE.PlaneGeometry(100,100), gMat);
  gMesh.rotation.x = -Math.PI/2; gMesh.position.y = -0.05;
  gMesh.receiveShadow = true; gMesh.userData={is3d:true};
  T.scene.add(gMesh);
  setupOrbit(container);
  build3D();
  animate3D();
  console.log("init3D done");
}

function setupOrbit(container){
  var cam = T.camera;
  var theta = Math.PI/4, phi = Math.PI/3.5, r = 32;
  var target = new THREE.Vector3(0, 0, 0);
  T.orbit = {theta:theta, phi:phi, r:r, target:target};
  function update(){
    var x = target.x + r * Math.sin(phi) * Math.cos(theta);
    var y = target.y + r * Math.cos(phi);
    var z = target.z + r * Math.sin(phi) * Math.sin(theta);
    cam.position.set(x, y, z); cam.lookAt(target);
  }
  T.orbit.update = update; update();
  var dragging=false, panning=false, prevX=0, prevY=0;
  container.addEventListener("mousedown", function(e){ if(e.button===0){dragging=true;prevX=e.clientX;prevY=e.clientY;} if(e.button===2){panning=true;prevX=e.clientX;prevY=e.clientY;} });
  container.addEventListener("mousemove", function(e){
    if(dragging){ theta-=(e.clientX-prevX)*0.007; phi=Math.max(0.18,Math.min(1.45,phi+(e.clientY-prevY)*0.007)); prevX=e.clientX;prevY=e.clientY; update(); }
    if(panning){ var rf=0.025; var right=new THREE.Vector3(); cam.getWorldDirection(right); var up=new THREE.Vector3(0,1,0); var panRight=new THREE.Vector3().crossVectors(right,up).normalize(); target.addScaledVector(panRight,-(e.clientX-prevX)*rf); target.y+=(e.clientY-prevY)*rf; prevX=e.clientX;prevY=e.clientY; update(); }
  });
  container.addEventListener("mouseup", function(){dragging=false;panning=false;});
  container.addEventListener("mouseleave", function(){dragging=false;panning=false;});
  container.addEventListener("wheel", function(e){e.preventDefault(); r=Math.max(3,Math.min(60,r+e.deltaY*0.018)); update();},{passive:false});
  container.addEventListener("contextmenu", function(e){e.preventDefault();});
}

function clear3D(){
  if(!T.scene) return;
  var toRemove = [];
  T.scene.traverse(function(obj){ if(obj.userData&&obj.userData.is3d) toRemove.push(obj); });
  for(var i=0;i<toRemove.length;i++){ var obj=toRemove[i]; if(obj.geometry)obj.geometry.dispose(); if(obj.material){if(obj.material.map)obj.material.map.dispose();obj.material.dispose();} T.scene.remove(obj); }
}

function build3D(){
  if(!T.scene){console.log("build3D: no scene");return;}
  console.log("build3D floors=", state.floors, "floorData=", state.floorData.length);
  clear3D();
  var W=state.width, L=state.length, H=state.floorHeight, nf=state.floors, wallT=0.08;
  var mc={};
  function getWallMat(color){ if(mc[color])return mc[color]; var c=new THREE.Color(color); var m=new THREE.MeshStandardMaterial({color:c,roughness:0.55,metalness:0.08,transparent:true,opacity:0.88,side:THREE.DoubleSide}); mc[color]=m; return m; }
  function getFloorMat(color){ var c=new THREE.Color(color); return new THREE.MeshStandardMaterial({color:c,roughness:0.5,metalness:0,transparent:true,opacity:0.38}); }
  for(var f=0;f<nf;f++){
    var fy=f*H, fl=state.floorData[f];
    var slabG=new THREE.BoxGeometry(W,0.15,L), slabM=new THREE.MeshStandardMaterial({color:0xdddddd,roughness:0.85});
    var slab=new THREE.Mesh(slabG,slabM); slab.position.set(W/2,fy-0.07,L/2); slab.castShadow=true; slab.receiveShadow=true; slab.userData={is3d:true}; T.scene.add(slab);
    var ceilG=new THREE.BoxGeometry(W,0.05,L), ceilM=new THREE.MeshStandardMaterial({color:0xeeeeee,roughness:0.9,transparent:true,opacity:0.10});
    var ceil=new THREE.Mesh(ceilG,ceilM); ceil.position.set(W/2,fy+H,L/2); ceil.userData={is3d:true}; T.scene.add(ceil);
    (function(floorIdx){
      var cv=document.createElement("canvas"); cv.width=256;cv.height=128; var cx=cv.getContext("2d");
      cx.fillStyle="#00d4aa"; cx.font="bold 72px sans-serif"; cx.textAlign="center"; cx.textBaseline="middle";
      cx.fillText((floorIdx+1)+"F",128,64);
      var tex=new THREE.CanvasTexture(cv); var smat=new THREE.SpriteMaterial({map:tex,transparent:true,depthTest:false});
      var sp=new THREE.Sprite(smat); sp.position.set(W/2,fy+H+0.6,-0.5); sp.scale.set(2,0.75,1); sp.userData={is3d:true}; T.scene.add(sp);
    })(f);
    var md = state.mainDoors[f];
    if(md){
      (function(mainDoor, floorY){
        var doorW = state.mainDoorWidth, doorH = 2.2, doorD = 0.12;
        var doorGeo = new THREE.BoxGeometry(doorW, doorH, doorD);
        var doorMat = new THREE.MeshStandardMaterial({color:0x8B4513, roughness:0.6});
        var door = new THREE.Mesh(doorGeo, doorMat);
        var dx, dz;
        if(mainDoor.wall === "bottom"){ dx = mainDoor.offset/100 + doorW/2; dz = L + doorD/2; }
        else if(mainDoor.wall === "top"){ dx = mainDoor.offset/100 + doorW/2; dz = -doorD/2; }
        else if(mainDoor.wall === "left"){ dx = -doorD/2; dz = mainDoor.offset/100 + doorW/2; doorGeo = new THREE.BoxGeometry(doorD, doorH, doorW); }
        else { dx = W + doorD/2; dz = mainDoor.offset/100 + doorW/2; doorGeo = new THREE.BoxGeometry(doorD, doorH, doorW); }
        door.position.set(dx, floorY + doorH/2, dz);
        door.castShadow = true; door.userData = {is3d:true};
        T.scene.add(door);
        var frameMat = new THREE.MeshStandardMaterial({color:0x666666, roughness:0.7});
        if(mainDoor.wall === "bottom" || mainDoor.wall === "top"){
          var frameT = new THREE.Mesh(new THREE.BoxGeometry(doorW+0.16, doorH+0.08, 0.08), frameMat);
          frameT.position.set(dx, floorY + doorH/2, mainDoor.wall==="bottom"?L+0.04:-0.04);
          frameT.userData={is3d:true}; T.scene.add(frameT);
        } else {
          var frameS = new THREE.Mesh(new THREE.BoxGeometry(0.08, doorH+0.08, doorW+0.16), frameMat);
          frameS.position.set(mainDoor.wall==="left"?-0.04:W+0.04, floorY + doorH/2, dz);
          frameS.userData={is3d:true}; T.scene.add(frameS);
        }
      })(md, fy);
    }
    if(fl&&fl.rooms){ for(var ri=0;ri<fl.rooms.length;ri++){
      var r=fl.rooms[ri], rx=r.x/100, ry=r.y/100, rw=r.w/100, rh=r.h/100, hh=H;
      var arG=new THREE.PlaneGeometry(rw-wallT*2,rh-wallT*2), arM=getFloorMat(r.color);
      var ar=new THREE.Mesh(arG,arM); ar.rotation.x=-Math.PI/2; ar.position.set(rx+rw/2,fy+0.08,ry+rh/2); ar.userData={is3d:true}; ar.receiveShadow=true; T.scene.add(ar);
      var wM=getWallMat(r.color);
      var wf=new THREE.Mesh(new THREE.BoxGeometry(rw,hh,wallT),wM); wf.position.set(rx+rw/2,fy+hh/2,ry+wallT/2); wf.castShadow=true; wf.userData={is3d:true}; T.scene.add(wf);
      var wb=new THREE.Mesh(new THREE.BoxGeometry(rw,hh,wallT),wM); wb.position.set(rx+rw/2,fy+hh/2,ry+rh-wallT/2); wb.castShadow=true; wb.userData={is3d:true}; T.scene.add(wb);
      var wl=new THREE.Mesh(new THREE.BoxGeometry(wallT,hh,rh),wM); wl.position.set(rx+wallT/2,fy+hh/2,ry+rh/2); wl.castShadow=true; wl.userData={is3d:true}; T.scene.add(wl);
      var wr2=new THREE.Mesh(new THREE.BoxGeometry(wallT,hh,rh),wM); wr2.position.set(rx+rw-wallT/2,fy+hh/2,ry+rh/2); wr2.castShadow=true; wr2.userData={is3d:true}; T.scene.add(wr2);
      if(r.door){
        (function(rm,rxx,ryy,rww,rhh){
          var doorW=0.9, doorH=2.1, doorD=0.08;
          var doorGeo=new THREE.BoxGeometry(doorW,doorH,doorD);
          var doorMat=new THREE.MeshStandardMaterial({color:0x8B4513,roughness:0.8});
          var door=new THREE.Mesh(doorGeo,doorMat);
          var dx, dz, rotY=0;
          if(rm.door.wall==="bottom"){ dx=rxx+rm.door.offset/100+doorW/2; dz=ryy+wallT/2+0.01; }
          else if(rm.door.wall==="top"){ dx=rxx+rm.door.offset/100+doorW/2; dz=ryy+rhh-wallT/2-0.01; rotY=Math.PI; }
          else if(rm.door.wall==="left"){ dx=rxx+wallT/2+0.01; dz=ryy+rm.door.offset/100+doorW/2; doorGeo=new THREE.BoxGeometry(doorD,doorH,doorW); rotY=-Math.PI/2; }
          else { dx=rxx+rww-wallT/2-0.01; dz=ryy+rm.door.offset/100+doorW/2; doorGeo=new THREE.BoxGeometry(doorD,doorH,doorW); rotY=Math.PI/2; }
          door.position.set(dx,fy+doorH/2,dz); door.rotation.y=rotY;
          door.castShadow=true; door.userData={is3d:true}; T.scene.add(door);
        })(r,rx,ry,rw,rh);
      }
      // 家具（简化3D盒子）
      if(r.furniture){
        (function(rm, fy, rxx, ryy, roomH, roomType){
          for(var fi=0;fi<rm.furniture.length;fi++){
            var f=rm.furniture[fi];
            var fw=f.w/100, fh=0.6, fd=f.h/100;
            // 沙发高一些，床更矮宽
            if(f.id==="sofa"||f.id==="bed180"||f.id==="bed150"||f.id==="bed120") fh=0.45;
            var furnGeo=new THREE.BoxGeometry(fw, fh, fd);
            var furnColor=new THREE.Color(f.id==="bed180"||f.id==="bed150"||f.id==="bed120"?"#8888aa":f.id==="sofa"||f.id==="armchair"?"#6688cc":f.id==="diningTable"||f.id==="desk"?"#aa8844":f.id==="toilet"||f.id==="washbasin"?"#aaccdd":"#ccaa88");
            var furnMat=new THREE.MeshStandardMaterial({color:furnColor,roughness:0.7});
            var furnMesh=new THREE.Mesh(furnGeo,furnMat);
            furnMesh.position.set(rxx+f.px/100, fy+fh/2+0.08, ryy+f.py/100);
            furnMesh.castShadow=true; furnMesh.receiveShadow=true; furnMesh.userData={is3d:true};
            T.scene.add(furnMesh);
          }
        })(r, fy, rx, ry, hh, r.type);
      }
      (function(rm){ var cv=document.createElement("canvas"); cv.width=512;cv.height=128; var cx=cv.getContext("2d");
        cx.fillStyle=rm.color; cx.font="bold 60px sans-serif"; cx.textAlign="center"; cx.textBaseline="middle";
        cx.fillText(rm.name,256,64);
        var tex=new THREE.CanvasTexture(cv); var smat=new THREE.SpriteMaterial({map:tex,transparent:true,depthTest:false});
        var sp=new THREE.Sprite(smat); sp.position.set(rm.x/100+rm.w/100/2,fy+hh+0.3,rm.y/100+rm.h/100/2); sp.scale.set(3,0.75,1); sp.userData={is3d:true}; T.scene.add(sp);
      })(r);
    }}
  }
  var md=Math.max(W,L,H*nf)*2.0; T.orbit.r=md; T.orbit.target.set(W/2,H*nf/2,L/2); T.orbit.update();
  console.log("build3D done, scene children=", T.scene.children.length);
}

function animate3D(){
  T.animId = requestAnimationFrame(animate3D);
  if(T.renderer&&T.scene&&T.camera) T.renderer.render(T.scene, T.camera);
}
function on3dResize(){
  var c=document.getElementById("view3d"); if(!c||c.clientWidth===0)return;
  T.camera.aspect=c.clientWidth/c.clientHeight; T.camera.updateProjectionMatrix();
  T.renderer.setSize(c.clientWidth,c.clientHeight);
}
function destroy3D(){
  if(T.animId){cancelAnimationFrame(T.animId);T.animId=null;}
  if(T.renderer&&T.renderer.domElement&&T.renderer.domElement.parentNode){T.renderer.domElement.parentNode.removeChild(T.renderer.domElement);}
  T.scene=null; T.camera=null; T.renderer=null; T.orbit=null;
}

/* ===== 导出 ===== */
function exportImage(){ var a=document.createElement("a"); a.download="户型图_"+state.width+"x"+state.length+"_"+state.floors+".png"; a.href=canvas.toDataURL("image/png"); a.click(); }
function exportJSON(){
  var user = null;
  try { user = JSON.parse(localStorage.getItem("floorplan_user") || "null"); } catch(e){}
  var data={width:state.width,length:state.length,floorHeight:state.floorHeight,floors:state.floors,
    floorRoomConfigs:state.floorRoomConfigs,
    mainDoorWidth:state.mainDoorWidth,
    mainDoors:state.mainDoors,
    floorData:state.floorData.map(function(f){return{rooms:f.rooms.map(function(r){return{type:r.type,name:r.name,x:+(r.x/100).toFixed(2),y:+(r.y/100).toFixed(2),w:+(r.w/100).toFixed(2),h:+(r.h/100).toFixed(2),door:r.door||null,furniture:r.furniture||null};})};})};  if(user) data._user = user;
  data._submitTime = new Date().toISOString();
  document.getElementById("exportData").value=JSON.stringify(data,null,2);
  document.getElementById("exportModal").classList.add("show");
  // 异步通知企业微信
  try {
    var roomSummary = state.floorData.map(function(floor){
      return floor.rooms.map(function(r){ return r.name; }).join("、");
    });
    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: user ? user.phone : null,
        province: user ? user.province : null,
        city: user ? user.city : null,
        town: user ? user.town : null,
        floorCount: state.floors,
        roomSummary: roomSummary
      })
    }).catch(function(){});
  } catch(e){}
}
function closeModal(){ document.getElementById("exportModal").classList.remove("show"); }
function copyExport(){ document.getElementById("exportData").select(); document.execCommand("copy"); closeModal(); }
function resetDesign(){ deselectRoom(); state.zoom=1;state.panX=0;state.panY=0; generateLayout(); }

/* ===== 启动 ===== */
if(typeof THREE !== "undefined"){ init(); } else { window.addEventListener("THREE_LOADED", init); }

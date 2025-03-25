const http = require('http');
const url = require('url');

// 定义不同路由对应的 ASCII 图
const asciiArt = {
    '/': `
  __   __            ___ _            __   ___            __   __           
  \\ \\ / /           |_  (_)           \\ \\ / (_)           \\ \\ / /           
   \\ V /__ _ _ __     | |_ _ __   __ _ \\ V / _  __ _  ___  \\ V / _   _  ___ 
    \\ // _\` | '_ \\    | | | '_ \\ / _\` |/   \\| |/ _\` |/ _ \\ /   \\| | | |/ _ \\
    | | (_| | | | /\\__/ / | | | | (_| / /^\\ \\ | (_| | (_) / /^\\ \\ |_| |  __/
    \\_/\\__,_|_| |_\\____/|_|_| |_|\\__, \\/   \\/_|\\__,_|\\___/\\/   \\/\\__,_|\\___|
                                  __/ |                                     
                                 |___/                                      
  `,
    '/m': `

    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢻⣿⡏⠛⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⡉⣿⡿⠠⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠷⠀⠛⠛⠛⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣏⢹⣿⣤⣟⣡⣾⣿⣿⣿⣿
    ⣿⣿⣿⣍⣭⡄⠰⠂⣰⠒⣿⣿⣿⣿⣿⣿⣿⣿⣤⡴⢶⠶⠛⠛⠛⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⣿⣿⠻⠿⣿⣿⣿⣿⣿⣿⡏⢻⣛⣋⣭⡥⢶⣖⣠⣼⣿⣿
    ⣿⣿⣿⠿⢸⠻⢚⡋⢙⠀⣥⣿⣿⣿⣿⣿⣿⣿⣿⣿⠈⠿⠟⠁⣾⣿⣿⣿⣿⣿⣿⣿⣿⠋⣸⣿⣿⠀⣿⣿⣷⣤⣿⣿⣿⣿⣿⣿⣠⣿⣏⣉⡵⢂⣴⣿⣿⣿⣿⣿
    ⣿⣿⣷⠖⢸⡇⣛⣁⣸⣤⣤⣾⣿⣿⣿⣿⣿⣿⣿⠟⣷⣶⠀⣿⡛⠛⣿⣿⣿⣿⣿⣿⣿⣶⣿⣿⡿⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠟⢛⣉⠀⣥⣬⣿⣿⣿⣿
    ⣿⣿⣦⡾⢻⡟⢹⡏⢹⣷⠈⢻⣿⣿⣿⣿⣿⣿⣿⣰⣿⡿⠀⣿⣿⣦⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠀⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣦⣿⣿⣾⣿⣾⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⣁⣸⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
                                         
  `,
    '/num': `
                                                                                                                                       00            
                   0008                              00009                                                                       309    50000         
            52      000                               0000                                                                  00   3009  10006          
            0000   000  1                             0000000000008                        0005                            6000   001 0007            
             0000000000000004                   1000000000000000000                         0000                            000     306   20000       
       00000000000000                       000000         72                               0009                         04     2800000000  00000     
             00000000 0004                       02 00000000009                             0000   000002                000000000    00  000         
         000  0000    300 00                     000      0001                      006     0000    200006              000        0000000            
         0000   40000000000                       002    000                       0000     0009       00               00   000000  007              
      300000 0003 3000300                         0000000000                      0000      0009                              08   000                
         000 006 2000 0000000                      01 000                          00       0009                                   0000000009         
        2000 000000005 0                         09   000   00000                           0009                           0300000000008              
     000007        2   000                     0002   000     0000                      90000008                           006      300               
      00  0   009 7000  0000                   009    000      600                         0000                                     000               
        000   000  000   0000                        20004                                                                          000               
       2000    09         00                         0000                                                                         0000                
              
  `,
    '/guozi': `

    ⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⡟⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⡿⠸⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠹⣿⣿⠃⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠉⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠈⣿⣿⡟⢀⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣭⣁⣄⢠⡶⢿⣿⣿⣿⣿⣿⣿⣿⣿⣟⠛⠃⠀⣉⡍⢠⣭⣭⣿⣿⣿⣿⣿⣿⣏⣩⣭⣭⣤⣶⡶⠶⣶⣶⣾⣿⣿⣿⣿⣿⣿⣿⡿⠟⣛⡉⠀⢀⣀⣨⣿⣿⣿⣿⣿⣿⣿⠋⢀⣾⣿⠏⣠⡿⠿⠿⠿⣿⣿
    ⣿⣿⣿⣿⣿⣿⡌⠙⣯⠘⣁⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⠻⣿⣆⣈⣠⣿⡏⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⢠⣶⡖⢀⣼⣿⣿⣿⣿⣿⣿⣿⠟⣡⣶⣿⣿⠃⣐⠙⣿⣿⣿⣿⣿⣿⣿⡿⠁⡀⢿⣿⢁⣴⡖⢶⡾⠋⣀⣼⣿
    ⣿⣿⣿⣿⠛⠛⣋⣠⠅⠠⣤⣤⣼⣿⣿⣿⣿⣿⣿⣿⠿⠃⢸⡈⣴⠀⣽⠁⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣄⡍⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣿⠏⠀⠛⠀⣿⣿⣿⣿⣿⣿⣯⣴⣾⡇⢸⣿⡿⢹⣿⢸⡷⠿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⡿⣣⡆⢸⣮⡙⠿⢿⣿⣿⣿⣿⣿⣿⣿⡇⢸⣇⣉⣴⣿⣄⣉⣻⣿⣿⣿⣿⣿⣿⣿⡏⢸⣿⡇⢸⣿⡄⠹⣿⣿⣿⣿⣿⣿⣷⣙⠛⣋⣴⢠⠘⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⢸⡟⢀⣼⣿⢸⣿⣦⠈⣿⣿
    ⣿⣿⣿⣿⣉⣡⣾⣿⡇⢸⣿⣿⣷⣶⣦⣼⣿⣿⣿⣏⣩⡔⣿⡏⢿⣯⠻⣿⡝⢻⣿⣿⣿⣿⣿⣿⣿⣄⣾⣿⡇⣼⣿⣿⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⢸⣾⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⣿⣿⣿⣿⣿⢸⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣍⠃⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢀⣿⣧⣼⣿⣦⣿⣿⣤⣿⣿⣿⣿⣿⣿⣿⣿⣿⣉⣀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣼⣏⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣿⣿⣿⣦⣁⣼⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⡏⠙⣿⡿⠻⠿⡟⠻⣿⣿⣿⣿⣿⣿⣿⡏⠛⣥⡄⢰⣶⠆⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠹⠿⢟⡛⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⠁⡼⢿⣦⡶⠟⣡⣾⣿⣿⣿⣿⣿⣿⣿⣿⡀⢭⡅⣴⡾⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣯⣀⡴⠾⠋⣠⣾⣿⣿⣿⣿⣿⣿⡿⢿⡿⠛⢻⣿⠏⢀⣋⣉⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⠿⠿⠃⣘⠁⣼⣿⣿⡆⠹⠿⠿⢿⣿⣿⣿⣿⣿⣿⣷⣬⡄⡘⢁⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠿⠖⠀⠛⠛⠻⣿⣿⣿⣿⣿⡀⠀⣶⠀⢰⣧⣶⠿⠛⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣶⣴⣶⠃⠾⠏⢠⣯⣤⣶⣶⠰⣿⣷⣾⣿⣿⣿⣛⣛⣩⣭⣭⡅⣤⣤⣤⣤⣼⣿⣿⣿⣿⣿⣷⣶⣶⣾⣿⣿⡇⢸⣿⣿⣿⣿⣿⣿⣿⣇⠀⢁⣠⣿⣧⣴⡖⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⠿⠋⣠⣌⠹⣿⣿⣿⠀⣿⣿⣿⣿⣿⣿⣿⣿⠋⢸⣿⡇⣿⣷⡉⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⢰⣿⣿⣿⣿⣿⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣶⣿⣿⣿⣷⡿⠿⠟⢸⣿⣿⣿⣿⣿⣿⣿⣯⣠⣿⣿⡇⣿⣿⣷⣤⣿⣿⣿⣿⣿⣿⣿⣿⣿⡛⠿⠿⢁⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠸⠿⠿⠿⠿⠋⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣤⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    
  `,
    '/xo': `
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxooxxxxxxxxxx
xxxxxxxxxxxxxxxo.ooxxxxxxxxxxxxxxxxxxxxxxxoooooxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxo.oxxo. .oxxxxxxx
xxxxxxxxxoooxxxo  oxxxxxxxxxxxxxxxxxxxxxxxo   oxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxooxxo .oxo  .oxxxxxxx
xxxxxxxxxo  oxxo  oooooxxxxxxxxxxxxxxxxxxxx.  .o.....oxxxxxxxxxxxxxxxxxxxo.ooxxxxxxxxxxxxxxxxxxxxxo  oxo..oo .oxxxxxxxxx
xxxxxxxxoo. ...       oxxxxxxxxxxxxooo....     ......oxxxxxxxxxxxxxxxxxxx.  oxxxxxxxxxxxxxxxxxxxxxx. oxxxoo..oo....oxxxx
xxxxxo.      ..  ooooooxxxxxxxxxxxxo  ..ooooooo..oxxxxxxxxxxxxxxxxxxxxxxxo  oxxoooxxxxxxxxxxxxxxo.ooo.........o.   oxxxx
xxxxxxooooo     .x  oooxxxxxxxxxxxxxoxx..o..     .xxxxxxxxxxxxxxxxxoooxxxo  oxxo   .oxxxxxxxxxxx. .o..ooooo..oo.oooxxxxx
xxxxxxxo ooooo...o  ..oxxxxxxxxxxxxxxxxo .xooo. .xxxxxxxxxxxxxxxxxo  oxxxo  oxxxo.  oxxxxxxxxxxo  oxoo.....  .oxxxxxxxxx
xxxxooo. o.....     oooxxxxxxxxxxxxxxxxx  ..    oxxxxxxxxxxxxxxxxo   oxxxo  oxxxxxooxxxxxxxxxxxo.oxxo ..o. .xxxxxxxxxxxx
xxxxo... o. ooo  o  . .oxxxxxxxxxxxxxxxxo..   oooooxxxxxxxxxxxxxxo..oxxxxo  oxxxxxxxxxxxxxxxxxxxxxxxxxxxo.  .  .oxxxxxxx
xxxxxxo. oo    ..o..ooooxxxxxxxxxxxxxxo.oxxo .xo.  .oxxxxxxxxxxxxxxxxxooxo  oxxxxxxxxxxxxxxxxxxxxoo....     ..oooxxxxxxx
xxxo.  .oooooooooxo..oxxxxxxxxxxxxxxxo  oxx. .xxo.  .xxxxxxxxxxxxxxxxxoo.   oxxxxxxxxxxxxxxxxxxxxo...ooooo  oxxxxxxxxxxx
xxxxo.oo.xx. oo  oxo  .xxxxxxxxxxxxxxo oxxx. .xxxxo..xxxxxxxxxxxxxxxxxxoo. oxxxxxxxxxxxxxxxxxxxxxxxxxxxxxo  oxxxxxxxxxxx
xxxxxx.  ox. ox. oxx. .oxxxxxxxxxxxxxxxxxo.  .xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxo. .xxxxxxxxxxxx
xxxxxxo.oxxoooxxoxxxxooxxxxxxxxxxxxxxxxxxoo..oxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxoo.   oxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxooo.oxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    `
};

// 创建服务器
const server = http.createServer((req, res) => {
    // 解析请求的路径
    const pathname = url.parse(req.url).pathname;

    // 设置响应头为纯文本
    res.setHeader('Content-Type', 'text/plain');

    // 根据路径返回对应的 ASCII 图
    if (asciiArt[pathname]) {
        res.end(asciiArt[pathname]);
    } else {
        // 如果路径不存在，返回 404 ASCII 图
        res.statusCode = 404;
        res.end(asciiArt['/error']);
    }
});

// 启动服务器
const port = 8080;
server.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});
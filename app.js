const http = require('http');
const fs = require('fs');
const template = require('art-template');
const url = require('url')

const comments = [
    {
        name: 'name_1',
        message: 'Research about Nanostructured Transition Metal Phosphides Published in EES',
        dataTime: '2020-11-16'
    },
    {
        name: 'name_2',
        message: 'Research about Nanostructured Transition Metal Phosphides Published in EES',
        dataTime: '2020-11-16'
    },
    {
        name: 'name_3',
        message: 'Research about Nanostructured Transition Metal Phosphides Published in EES',
        dataTime: '2020-11-16'
    },
    {
        name: 'name_4',
        message: 'Research about Nanostructured Transition Metal Phosphides Published in EES',
        dataTime: '2020-11-16'
    },
    {
        name: 'name_5',
        message: 'Research about Nanostructured Transition Metal Phosphides Published in EES',
        dataTime: '2020-11-16'
    },
]

http.createServer(function (req, res) {
    //使用url.parse方法将路径解析成一个方便操作的对象，第二个参数为true表示直接将查询字符串转成一个对象
    const pathObj = url.parse(req.url, true)
    //单独获取不包含查询字符串的路径部分(该路径不包含？之后的内容)
    const pathname = pathObj.pathname

    if (pathname === '/'){
        fs.readFile('./views/index.html', function (err, data) {
            if (err) {
                return console.log('404 NOT FOUND')
            }
            const htmlStr = template.render(data.toString(), {
                comments: comments
            })
            res.end(htmlStr)
        })

    } else if (pathname.indexOf('/public/') === 0) {
        fs.readFile('.' + pathname, function (err, data) {
            if (err) {
                return console.log('404 NOT FOUND')
            }

            res.end(data)
        })
    } else if (pathname === '/post') {
        fs.readFile('./views/post.html', function (err, data) {
            if (err) {
                return console.log('404 NOT FOUND')
            }

            res.end(data)
        })
    }  else if (pathname === '/comments') {
        const comment = pathObj.query;
        comment.dataTime = '2020-11-16 16:13';
        comments.push(comment);
        //服务端此时已把数据储存完毕，接下来让用户重新请求 / 页面，就可以看到最新留言内容

        //如何通过服务器让客户端重定向？
        //  1.状态码设置为302临时重定向
        //      statusCode
        //  2.在响应头通过Location告诉客户端往哪重定向
        //      setHeader
        //如果客户端发现收到服务器的响应状态码是302，就会自动去响应头中找Location，然后对该地址发起新的请求
        res.statusCode = 302;
        res.setHeader('Location', '/')
        // console.log('success', pathObj.query);
        // res.end(JSON.stringify(pathObj.query))
        res.end()
    } else {
        fs.readFile('./views/404.html',function (err, data) {
            res.end(data)
        })
    }
    // console.log(pathname)
    

    }
).listen(4396, function () {
    console.log('server is running')
})
// 创建一个指定大小的buffer
const buf1 = Buffer.alloc(10)
console.log(buf1)

// 从字符串或者数组创建一个buffer
const buf2 = Buffer.from("a");
console.log(buf2)

// 链接两个buffer
const bug3 = Buffer.concat([buf1, buf2])
console.log(bug3)
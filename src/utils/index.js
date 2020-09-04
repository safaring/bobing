//随机从数组中获取一个元素
const randomItem = items => items[Math.random() * items.length | 0]

//随机打乱数组元素的顺序
const shuffle = items => items.sort(() => Math.random() - 0.5)

//重复已有数组n次
const repeat = (times, items) => new Array(times).fill(items).flat()

//删除数组中的某个元素
const filter = (key, items) => items.filter(item => item !== key)

export default {
    randomItem,
    shuffle,
    repeat,
    filter
}
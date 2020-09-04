<template>
    <div>
        <div class="bowl">
            <img :src="bowlImg" alt="" class="bg_img">
            <div v-if="rptIsShow">
                <img v-for="(item,index) in ranRptList" :key="index" :src="rptList[item-1]" alt="" class="redpacket"
                    :id="'r'+(index+1)">
            </div>
        </div>
        <div class="btn" @click="start">开始游戏</div>
        <select name="choice" v-model="modelSelected">
            <option :value="model.type" :key="index" v-for="(model,index) in modelList">{{model.name}}</option>
        </select>
    </div>
</template>
<script>
    import bowlImg from '../assets/port.jpg'
    import dice1 from '../assets/1.jpg'
    import dice2 from '../assets/2.jpg'
    import dice3 from '../assets/3.jpg'
    import dice4 from '../assets/4.jpg'
    import dice5 from '../assets/5.jpg'
    import dice6 from '../assets/6.jpg'
    import utils from '../utils'
    export default {
        name: 'Home',
        data() {
            return {
                bowlImg,
                rptIsShow: false,
                rptList: [
                    dice1,
                    dice2,
                    dice3,
                    dice4,
                    dice5,
                    dice6
                ],
                ranRptList: [],
                modelSelected: 1,
                modelList: [
                    {
                        type: 1,
                        name: '一秀'
                    },
                    {
                        type: 2,
                        name: '二举'
                    },
                    {
                        type: 3,
                        name: '四进'
                    },
                    {
                        type: 4,
                        name: '三红'
                    },
                    {
                        type: 5,
                        name: '对堂'
                    },
                    {
                        type: 6,
                        name: '四红'
                    },
                    {
                        type: 7,
                        name: '五子'
                    },
                    {
                        type: 8,
                        name: '五红'
                    },
                    {
                        type: 9,
                        name: '六勃黑'
                    },
                    {
                        type: 10,
                        name: '遍地锦'
                    },
                    {
                        type: 11,
                        name: '六勃红'
                    },
                    {
                        type: 12,
                        name: '状元插金花'
                    },
                ]

            }
        },
        methods: {
            start() {
                //根据选择，摇出对应的点数
                this.ranRptList = this.getRptType(this.modelSelected)
                this.rptIsShow = false
                setTimeout(() => {
                    this.rptIsShow = true
                }, 0);
            },
            getRptType(type) {
                let rlist, //点数列表
                    ranRpt, //随机点数
                    ranList //随机列表
                switch (type) {
                    case 1: //一秀（有一个4点）
                        rlist = [4]
                        ranList = [1, 2, 3, 5, 6]
                        ranList = utils.repeat(3, ranList) //4以外最多可出现三个一样
                        ranList = utils.shuffle(ranList)
                        ranList = ranList.splice(0, 5)
                        if ((new Set(ranList)).size == ranList.length) { //5个都没有重复，会出现对堂
                            ranList[0] = ranList[1]
                        }
                        rlist = rlist.concat(ranList)
                        break;
                    case 2: //二举（有两个4点）
                        rlist = utils.repeat(2, [4])
                        ranList = [1, 2, 3, 5, 6]
                        ranList = utils.repeat(3, ranList) //4以外最多可出现三个一样
                        ranList = utils.shuffle(ranList)
                        ranList = ranList.splice(0, 4)
                        rlist = rlist.concat(ranList)
                        break;
                    case 3: //四进（4个一样的点数）
                        ranList = [1, 2, 3, 5, 6] //4以外
                        ranRpt = utils.randomItem(ranList)
                        rlist = utils.repeat(4, [ranRpt])
                        ranList = utils.filter(ranRpt, ranList)
                        ranList.push(4)
                        rlist.push(utils.randomItem(ranList))
                        rlist.push(utils.randomItem(ranList))
                        break;
                    case 4: //三红（有3个4点）
                        rlist = utils.repeat(3, [4])
                        ranList = [1, 2, 3, 5, 6]
                        rlist.push(utils.randomItem(ranList))
                        rlist.push(utils.randomItem(ranList))
                        rlist.push(utils.randomItem(ranList))
                        break;
                    case 5: //对堂（1，2，3，4，5，6）
                        rlist = [1, 2, 3, 4, 5, 6]
                        break;
                    case 6: //四红（4个4点，另外2个带12点最大，3点最小）
                        rlist = utils.repeat(4, [4])
                        ranList = [1, 2, 3, 5, 6]
                        ranRpt = utils.randomItem(ranList)
                        rlist.push(ranRpt) //出现一个1，最后一个排除1，否则为状元插金花
                        if (ranRpt === 1) ranList = [2, 3, 5, 6]
                        rlist.push(utils.randomItem(ranList))
                        break;
                    case 7: //五子（五个一样的，带点最大的赢）
                        ranList = [1, 2, 3, 5, 6]
                        ranRpt = utils.randomItem(ranList)
                        rlist = utils.repeat(5, [ranRpt])
                        //第六个做排除
                        ranList = utils.filter(ranRpt, ranList)
                        rlist.push(utils.randomItem(ranList))
                        break;
                    case 8: //五红（5个4点，带6最大，带1最小）
                        rlist = utils.repeat(5, [4])
                        rlist.push(utils.randomItem([1, 2, 3, 5, 6]))
                        break;
                    case 9: //六勃黑（6个都一样，且都是黑色点数）
                        ranList = [2, 3, 5, 6]
                        ranRpt = utils.randomItem(ranList)
                        rlist = utils.repeat(6, [ranRpt])
                        break;
                    case 10: //遍地锦（6个1）
                        rlist = utils.repeat(6, [1])
                        break;
                    case 11: //六勃红（6个4）
                        rlist = utils.repeat(6, [4])
                        break;
                    case 12: //状元插金花（4个4带2个1）
                        rlist = [4, 4, 4, 4, 1, 1]
                        break;
                    default:
                        break;
                }
                return utils.shuffle(rlist)
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../style/base/function";

    .bowl {
        width: 78%;
        margin: pxToRem(40px) auto;
        position: relative;

        .bg_img {
            margin-top: pxToRem(200px);
            width: 100%;
        }

        .redpacket {
            top: 15%;
            left: 20%;
            width: 12%;
            position: absolute;
            animation-duration: 1.5s;
            animation-fill-mode: both;
            animation-direction: alternate;
        }

        #r1 {
            animation-name: dice1;
        }

        #r2 {
            animation-name: dice2;
        }

        #r3 {
            animation-name: dice3;
        }

        #r4 {
            animation-name: dice4;
        }

        #r5 {
            animation-name: dice5;
        }

        #r6 {
            animation-name: dice6;
        }
    }

    .btn {
        width: 35%;
    }

    select {
        display: block;
        border: 1px solid #ddd;
        margin: pxToRem(20px) auto;
    }

    @keyframes dice1 {
        0% {
            top: 15%;
            left: 20%;
        }

        5% {
            top: 25%;
            left: 28%;
            transform: rotate(180deg);
        }

        10% {
            top: 34%;
            left: 36%;
            transform: rotate(360deg);
        }

        15% {
            top: 44%;
            left: 44%;
            transform: rotate(540deg);
        }

        20% {
            top: 53%;
            left: 53%;
            transform: rotate(720deg);
        }

        25% {
            top: 55%;
            left: 57%;
            transform: rotate(900deg);
        }

        30% {
            top: 57%;
            left: 64%;
            transform: rotate(1080deg);
        }

        35% {
            top: 62%;
            left: 62%;
            transform: rotate(1260deg);
        }

        40% {
            top: 66%;
            left: 61%;
            transform: rotate(1440deg);
        }

        45% {
            top: 68%;
            left: 59%;
            transform: rotate(1620deg);
        }

        50% {
            top: 70%;
            left: 56%;
            transform: rotate(3600deg);
        }

        55% {
            top: 71%;
            left: 51%;
            transform: rotate(1980deg);
        }

        60% {
            top: 72%;
            left: 45%;
            transform: rotate(2160deg);
        }

        65% {
            top: 70%;
            left: 40%;
            transform: rotate(2340deg);
        }

        70% {
            top: 68%;
            left: 35%;
            transform: rotate(2520deg);
        }

        75% {
            top: 63%;
            left: 28%;
            transform: rotate(5400deg);
        }

        80% {
            top: 58%;
            left: 22%;
            transform: rotate(2880deg);
        }

        85% {
            top: 55%;
            left: 26%;
            transform: rotate(3060deg);
        }

        90% {
            top: 52%;
            left: 30%;
            transform: rotate(3240deg);
        }

        95% {
            top: 55%;
            left: 37%;
            transform: rotate(1620deg);
        }

        100% {
            top: 57%;
            left: 44%;
        }
    }

    @keyframes dice2 {
        0% {
            top: 15%;
            left: 20%;
        }

        5% {
            top: 25%;
            left: 20%;
            transform: rotate(180deg);
        }

        10% {
            top: 35%;
            left: 21%;
            transform: rotate(360deg);
        }

        15% {
            top: 45%;
            left: 22%;
            transform: rotate(540deg);
        }

        20% {
            top: 55%;
            left: 23%;
            transform: rotate(720deg);
        }

        25% {
            top: 62%;
            left: 26%;
            transform: rotate(900deg);
        }

        30% {
            top: 69%;
            left: 30%;
            transform: rotate(1080deg);
        }

        35% {
            top: 70%;
            left: 34%;
            transform: rotate(1260deg);
        }

        40% {
            top: 71%;
            left: 38%;
            transform: rotate(1440deg);
        }

        45% {
            top: 71%;
            left: 41%;
            transform: rotate(1620deg);
        }

        50% {
            top: 72%;
            left: 45%;
            transform: rotate(3600deg);
        }

        55% {
            top: 71%;
            left: 50%;
            transform: rotate(1980deg);
        }

        60% {
            top: 70%;
            left: 54%;
            transform: rotate(2160deg);
        }

        65% {
            top: 69%;
            left: 58%;
            transform: rotate(2340deg);
        }

        70% {
            top: 68%;
            left: 62%;
            transform: rotate(2520deg);
        }

        75% {
            top: 66%;
            left: 63%;
            transform: rotate(5400deg);
        }

        80% {
            top: 63%;
            left: 64%;
            transform: rotate(2880deg);
        }

        85% {
            top: 59%;
            left: 63%;
            transform: rotate(3060deg);
        }

        90% {
            top: 55%;
            left: 61%;
            transform: rotate(3240deg);
        }

        95% {
            top: 54%;
            left: 58%;
            transform: rotate(1620deg);
        }

        100% {
            top: 53%;
            left: 55%;
        }
    }

    @keyframes dice3 {
        0% {
            top: 15%;
            left: 20%;
        }

        10% {
            top: 40%;
            left: 24%;
            transform: rotate(360deg);
        }

        20% {
            top: 65%;
            left: 28%;
            transform: rotate(720deg);
        }

        30% {
            top: 60%;
            left: 30%;
            transform: rotate(1080deg);
        }

        40% {
            top: 55%;
            left: 35%;
            transform: rotate(1440deg);
        }

        50% {
            top: 58%;
            left: 38%;
            transform: rotate(3600deg);
        }

        60% {
            top: 61%;
            left: 40%;
            transform: rotate(2160deg);
        }

        70% {
            top: 64%;
            left: 42%;
            transform: rotate(2520deg);
        }

        80% {
            top: 68%;
            left: 40%;
            transform: rotate(2880deg);
        }

        90% {
            top: 72%;
            left: 38%;
            transform: rotate(3240deg);
        }

        100% {
            top: 67%;
            left: 35%;
        }
    }

    @keyframes dice4 {
        0% {
            top: 15%;
            left: 20%;
        }

        5% {
            top: 28%;
            left: 30%;
            transform: rotate(180deg);
        }

        10% {
            top: 41%;
            left: 39%;
            transform: rotate(360deg);
        }

        15% {
            top: 55%;
            left: 44%;
            transform: rotate(540deg);
        }

        20% {
            top: 69%;
            left: 48%;
            transform: rotate(720deg);
        }

        25% {
            top: 70%;
            left: 42%;
            transform: rotate(900deg);
        }

        30% {
            top: 71%;
            left: 36%;
            transform: rotate(1080deg);
        }

        35% {
            top: 59%;
            left: 28%;
            transform: rotate(1260deg);
        }

        40% {
            top: 56%;
            left: 20%;
            transform: rotate(1440deg);
        }

        45% {
            top: 51%;
            left: 25%;
            transform: rotate(1620deg);
        }

        50% {
            top: 46%;
            left: 30%;
            transform: rotate(3600deg);
        }

        55% {
            top: 44%;
            left: 35%;
            transform: rotate(1980deg);
        }

        60% {
            top: 41%;
            left: 40%;
            transform: rotate(2160deg);
        }

        65% {
            top: 45%;
            left: 58%;
            transform: rotate(2340deg);
        }

        70% {
            top: 48%;
            left: 56%;
            transform: rotate(2520deg);
        }

        75% {
            top: 54%;
            left: 61%;
            transform: rotate(5400deg);
        }

        80% {
            top: 60%;
            left: 65%;
            transform: rotate(2880deg);
        }

        85% {
            top: 63%;
            left: 62%;
            transform: rotate(3060deg);
        }

        90% {
            top: 67%;
            left: 59%;
            transform: rotate(3240deg);
        }

        95% {
            top: 68%;
            left: 54%;
            transform: rotate(1620deg);
        }

        100% {
            top: 69%;
            left: 48%;
        }
    }

    @keyframes dice5 {
        0% {
            top: 15%;
            left: 20%;
        }

        10% {
            top: 40%;
            left: 40%;
            transform: rotate(360deg);
        }

        20% {
            top: 64%;
            left: 60%;
            transform: rotate(720deg);
        }

        30% {
            top: 72%;
            left: 52%;
            transform: rotate(1080deg);
        }

        40% {
            top: 71%;
            left: 36%;
            transform: rotate(1440deg);
        }

        50% {
            top: 58%;
            left: 24%;
            transform: rotate(3600deg);
        }

        60% {
            top: 45%;
            left: 33%;
            transform: rotate(2160deg);
        }

        70% {
            top: 42%;
            left: 52%;
            transform: rotate(2520deg);
        }

        80% {
            top: 47%;
            left: 60%;
            transform: rotate(2880deg);
        }

        90% {
            top: 54%;
            left: 64%;
            transform: rotate(3240deg);
        }

        100% {
            top: 64%;
            left: 60%;
        }
    }

    @keyframes dice6 {
        0% {
            top: 15%;
            left: 20%;
        }

        10% {
            top: 24%;
            left: 26%;
            transform: rotate(360deg);
        }

        20% {
            top: 33%;
            left: 31%;
            transform: rotate(720deg);
        }

        30% {
            top: 42%;
            left: 37%;
            transform: rotate(1080deg);
        }

        40% {
            top: 50%;
            left: 42%;
            transform: rotate(1440deg);
        }

        50% {
            top: 53%;
            left: 46%;
            transform: rotate(3600deg);
        }

        60% {
            top: 55%;
            left: 51%;
            transform: rotate(2160deg);
        }

        70% {
            top: 58%;
            left: 46%;
            transform: rotate(2520deg);
        }

        80% {
            top: 60%;
            left: 42%;
            transform: rotate(2880deg);
        }

        90% {
            top: 58%;
            left: 37%;
            transform: rotate(3240deg);
        }

        100% {
            top: 55%;
            left: 32%;
        }
    }
</style>
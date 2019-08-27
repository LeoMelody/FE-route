/*
 * @Author: leo 
 * @Date: 2019-08-21 22:58:23 
 * @Last Modified by: leo
 * @Last Modified time: 2019-08-27 22:08:18
 */

function main() {}

main()

class Player {
  constructor(info = {
    // 玩家基础信息
  }) {
    this.atack = info.atack || 100
    // 假定天选之子，暴击最多为0.01 ~ 0.09
    this.crit = info.crit || +(Math.random()*0.1).toFixed(2)
    // 初始化暴击伤害为 150%
    this.critDamage = info.critDamage || 1.5
    // 攻击频率 一秒一次
    this.atackFrequency = info.atackFrequency || 1
  }

  /**
   * 攻击时间
   */
  continueAtach(time = 0) {

  }

  static createPlayer() {
    // 暂时不需要设置单例
    return new Player()
  }
}

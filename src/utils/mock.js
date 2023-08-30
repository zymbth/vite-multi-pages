// 返回一个随机的单词
export function mockWord() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const length = Math.floor(Math.random() * 10) + 3
  let result = ''

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}

// 返回一个随机的句子，包含10到110个单词
export function mockParagraph(min = 10, max = 100) {
  const wordLength = Math.floor(Math.random() * (max - min)) + min
  // 返回一个随机的句子，包含wordLength个单词
  return Array.from({ length: wordLength }, mockWord).join(' ')
}

export function mockPersonName() {
  const fn = ['张', '李', '王', '赵', '陈', '杨', '黄', '周', '吴', '刘']
  const ln = ['芳', '娜', '敏', '静', '强', '磊', '洋', '艳', '卫平', '志高', '国庆', '宇豪']
  return fn[Math.floor(Math.random() * fn.length)] + ln[Math.floor(Math.random() * ln.length)]
}

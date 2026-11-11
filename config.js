/**
 * DEEPCLEAN96 — editable demo configuration.
 * Prices and contacts below were taken from public listings; the business has not approved them.
 * To turn this into a real website, obtain business approval and change previewMode to false.
 */
window.DEEPCLEAN_CONFIG = {
  previewMode: true,
  brand: 'DeepClean96',
  city: 'Екатеринбург',
  phoneDisplay: '+7 (922) 600-94-30',
  phoneE164: '+79226009430',
  locationDisplay: 'Екатеринбург, ул. Белореченская, 15, корп. 3',
  sourceUrl: 'https://himchistka-gid.ru/ekaterinburg/deepclean96-110842022618',
  pricesUpdated: 'по открытым справочникам; актуальность уточняется',
  services: [
    { id: 'sofa', title: 'Химчистка диванов', short: 'Диваны', desc: 'Освежить обивку и вернуть мягкой мебели ухоженный вид.', price: 2500, unit: 'шт.', from: true, image: 'assets/service-sofa.svg', tag: 'Мягкая мебель', theme: 'peach' },
    { id: 'mattress', title: 'Химчистка матрасов', short: 'Матрасы', desc: 'Чистка матрасов с учётом материала и состояния.', price: 1200, unit: 'шт.', from: true, image: 'assets/service-mattress.svg', tag: 'Спальня', theme: 'lavender' },
    { id: 'chair', title: 'Химчистка кресел и стульев', short: 'Кресла и стулья', desc: 'Для мягких стульев, кресел и предметов с тканевой обивкой.', price: 350, unit: 'шт.', from: true, image: 'assets/service-chair.svg', tag: 'Мебель', theme: 'mint' },
    { id: 'rug', title: 'Химчистка ковров', short: 'Ковры', desc: 'Чистка ковров и ковровых покрытий с учётом площади.', price: 500, unit: 'м²', from: false, image: 'assets/service-rug.svg', tag: 'Напольные покрытия', theme: 'butter' },
    { id: 'leather', title: 'Химчистка кожаной мебели', short: 'Кожаная мебель', desc: 'Уход за диванами и стульями с кожаной обивкой.', price: 1500, unit: 'шт.', from: true, image: 'assets/service-leather.svg', tag: 'Деликатные материалы', theme: 'blue' },
    { id: 'auto', title: 'Химчистка салона автомобиля', short: 'Автосалон', desc: 'Отдельное направление чистки автомобильного салона.', price: null, unit: 'услуга', from: false, image: 'assets/service-auto.svg', tag: 'Авто', theme: 'rose' }
  ]
};

export default function AI(props) {
  function i18n(key) {
    console.log(props.i18n && props.i18n['ai'] && props.i18n['ai'][key] ? '' : 'AI Missing i18n: ' + key)
    return props.i18n && props.i18n['ai'] && props.i18n['ai'][key] ? props.i18n['ai'][key] : key
  }

  const dalle = [
    {
      "version": "DALL·E 2 Experimental",
      "prompt": "Create a line of high-performance athletic shoes that are not only functional but also visually stunning, featuring innovative design elements and cutting-edge technology.",
      "output": "https://media.discordapp.net/attachments/1016626715545571338/1082377502799958046/DALLE_2023-03-07_03.01.36_-_Create_a_line_of_high-performance_athletic_shoes_that_are_not_only_functional_but_also_visually_stunning_featuring_innovative_design_elements_and_cut.png?width=1722&height=1722",
      "source": "Discord",
      "sourceURL": "https://discord.com/channels/974519864045756446/1016626715545571338/1082377503093563462",
      "featured": "🏆 Hall of Fame"
    },
    {
      "version": "DALL·E 2 Experimental",
      "prompt": "Create a series of whimsical illustrations that tell a story of a magical forest filled with mtstical creatures and hidden secrets.",
      "output": "https://media.discordapp.net/attachments/979509782543220736/1082376598705156106/DALLE_2023-03-07_02.57.53_-_Create_a_series_of_whimsical_illustrations_that_tell_a_story_of_a_magical_forest_filled_with_mystical_creatures_and_hidden_secrets..png?width=1722&height=1722",
      "source": "Discord",
      "sourceURL": "https://discord.com/channels/974519864045756446/979509782543220736/1082376598977781800",
    },
    {
      "version": "DALL·E 2 Experimental",
      "prompt": "Design a modern and sustainable urban building that seamlessly blends with its surroundings and serves as a community hub for both business and leisure.",
      "output": "https://media.discordapp.net/attachments/998385019699613806/1082375675048108143/DALLE_2023-03-07_02.53.59_-_Design_a_modern_and_sustainable_urban_building_that_seamlessly_blends_with_its_surroundings_and_serves_as_a_community_hub_for_both_business_and_leisur.png?width=1722&height=1722",
      "source": "Discord",
      "sourceURL": "https://discord.com/channels/974519864045756446/998385019699613806/1082375675362689155"
    },
    {
      "version": "DALL·E 2 Experimental",
      "prompt": "Design a modern and sustainable urban building that seamlessly blends with its surroundings and serves as a community hub for both business and leisure.",
      "output": "https://media.discordapp.net/attachments/998385019699613806/1082375644006056036/DALLE_2023-03-07_02.53.57_-_Design_a_modern_and_sustainable_urban_building_that_seamlessly_blends_with_its_surroundings_and_serves_as_a_community_hub_for_both_business_and_leisur.png?width=1722&height=1722",
      "source": "Discord",
      "sourceURL": "https://discord.com/channels/974519864045756446/998385019699613806/1082375644324831322"
    },
    {
      "version": "DALL·E 2 Experimental",
      "prompt": "Design a modern and sustainable urban building that seamlessly blends with its surroundings and serves as a community hub for both business and leisure.",
      "output": "https://media.discordapp.net/attachments/998385019699613806/1082375583033471146/DALLE_2023-03-07_02.53.54_-_Design_a_modern_and_sustainable_urban_building_that_seamlessly_blends_with_its_surroundings_and_serves_as_a_community_hub_for_both_business_and_leisur.png?width=1722&height=1722",
      "source": "Discord",
      "sourceURL": "https://discord.com/channels/974519864045756446/998385019699613806/1082375583402573944"
    },
    {
      "version": "DALL·E 2 Experimental",
      "prompt": "In the heart of Tokyo, a young girl with bright pink hair made her way through the bustling city streets her eyes fixed on the horizon. She was on a...",
      "output": "https://media.discordapp.net/attachments/1016626157195644949/1082367318937567362/DALLE_2023-03-07_02.21.09_-_In_the_heart_of_Tokyo_a_young_girl_with_bright_pink_hair_made_her_way_through_the_bustling_city_streets_her_eyes_fixed_on_the_horizon._She_was_on_a_.png?width=1722&height=1722",
      "source": "Discord",
      "sourceURL": "https://discord.com/channels/974519864045756446/1016626157195644949/1082367319210217562",
      "featured": "🏆 Hall of Fame"
    },
    {
      "version": "DALL·E 2 Experimental",
      "prompt": "The sun was setting over the city skyline as a sleek black cat crept along the rooftop, her eyes fixed on the street below. She was on a mission...",
      "output": "https://media.discordapp.net/attachments/1016625865473400934/1082366693180973178/DALLE_2023-03-07_02.18.39_-_The_sun_was_setting_over_the_city_skyline_as_a_sleek_black_cat_crept_along_the_rooftop_her_eyes_fixed_on_the_street_below._She_was_on_a_mission_-_to.png?width=1722&height=1722",
      "source": "Discord",
      "sourceURL": "https://discord.com/channels/974519864045756446/1016625865473400934/1082366693499744337"
    }
  ]

  return (
    <div id="ai" data-aos="zoom-in" data-aos-once className="relative pt-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-left flex flex-wrap">
          <a className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl grow" href="#ai">
            {i18n("AI")}
            <i className="fa fa-user-robot ml-2"></i>
          </a>
          <p className="mt-2 max-w-2xl text-xl text-gray-500">
            {i18n("The latest prompt design and experimental results.")}
          </p>
        </div>
        <div className="mt-8">
          {/* Featured */}
          <div className="flex flex-wrap md:flex-nowrap overflow-x-auto max-w-full gap-6">
            { dalle.map((item, index) => (
              item.featured === '🏆 Hall of Fame' && (
                <a href={item.sourceURL} target="_blank" rel="noopener noreferrer" className="group w-96">
                  <img src={item.output} className="min-w-[350px] min-h-[350px] rounded-lg shadow-lg group-hover:scale-95 transition-all" />
                  <div className="mt-2 flex justify-between">
                    <span className="text-sm text-gray-500">{item.featured}</span>
                    <p className="text-sm text-gray-500 group-hover:text-gray-400">Open in {item.source}</p>
                  </div>
                  <p className="mt-2 font-semibold text-gray-900 dark:text-gray-100 italic">
                    "{item.prompt}" <span className="text-gray-500 text-xs">- {item.version}</span>
                  </p>
                </a>
              )
            ))}
          </div>
          {/* Other */}
          <div className="flex flex-wrap md:flex-nowrap overflow-x-auto max-w-full gap-6 mt-8">
            { dalle.map((item, index) => (
              item.featured !== '🏆 Hall of Fame' && (
                <a href={item.sourceURL} target="_blank" rel="noopener noreferrer" className="group w-96">
                  <img src={item.output} className="min-w-[280px] min-h-[280px] rounded-lg shadow-lg group-hover:scale-95 transition-all" />
                  <div className="mt-2 flex justify-between">
                    <span className="text-sm text-gray-500">🌠 NEW</span>
                    <p className="text-sm text-gray-500 group-hover:text-gray-400">Open in {item.source}</p>
                  </div>
                  <p className="mt-2 text-xs md:text-sm font-semibold text-gray-900 dark:text-gray-100 italic">
                    "{item.prompt}" <span className="text-gray-500 text-xs">- {item.version}</span>
                  </p>
                </a>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

var activeMethodsPill = {};
var activeScenesPill = {};
var activeModesPill = {};

var is_mobile = false;

category_examples = {
    'effect-generation': {
        'scenes': ['pexels_car_drift_2', 'davis_breakdance-flare', 'davis_surf', 'pexels_car_drift', 'boys-beach', 
            // 'boy-water', 
            'davis_car-roundabout', 'davis_bear', 'davis_snowboard', 'davis_motorbike', 'pexels_puddle_1', 'davis_miami-surf', 
            // 'boy-water-2', 
            'davis_camel', 'davis_kite-walk',
            // 'three_swans_lake',
        ],
        'methods': [''], // disabled
        'modes': [''],  // disabled
        'labels': {
            'davis_breakdance-flare':               ['Foreground', 'Background', 'Output'],
            'davis_surf': 	 	 	                ['Foreground', 'Background', 'Output'],
            'pexels_car_drift': 	 	 	        ['Foreground', 'Background', 'Output'],
            'pexels_car_drift_2': 	 	 	        ['Foreground', 'Background', 'Output'],
            'boys-beach': 	 	 	                ['Foreground', 'Background', 'Output'],
            // 'boy-water': 	 	 	                ['Foreground', 'Background', 'Output'],
            'davis_car-roundabout': 	 	 	    ['Foreground', 'Background', 'Output'],
            'davis_bear': 	 	 	                ['Foreground', 'Background', 'Output'],
            'davis_snowboard': 	 	 	            ['Foreground', 'Background', 'Output'],
            'davis_motorbike': 	 	 	            ['Foreground', 'Background', 'Output'],
            'pexels_puddle_1': 	 	 	            ['Foreground', 'Background', 'Output'],
            'davis_miami-surf': 	                ['Foreground', 'Background', 'Output'],
            // 'boy-water-2': 	 	 	                ['Foreground', 'Background', 'Output'],
            'davis_camel': 	 	 	                ['Foreground', 'Background', 'Output'],
            'davis_kite-walk': 	 	                ['Foreground', 'Background', 'Output'],
            // 'three_swans_lake':                   ['Foreground', 'Background', 'Output'],
        },
        'columns': 3,
        'is_demo': true,
        'remove_hover': false,
        'current_scene': null,
        'description': `
            Motivated by the challenges of effect generation in real production video compositing (see examples from <a href="https://youtu.be/qqQvGNSEFSk?t=87" target="_blank">ILM</a>, <a href="https://youtu.be/e7hutojLU6Q?si=5v0u52z094G87Vyu&t=76" target="_blank">Weta</a>, and <a href="https://youtu.be/dWGlvZX3hVA?si=VErjcIORHRmToT19&t=166" target="_blank">DNEG</a>), we introduce Over++, a framework for generating environmental effects without explicitly rendering the underlying interaction effects.
            By default, Over++ generates complex effects that best physically match the interactions between the foreground and background layers. 
            <br>
            Hover to visualize the generated effects.
        `,
    },
    'effect-editing': {
        'scenes': ['pexels_car_drift_edit', 'boat-shore_edit', 'comp_breakdance-waterfall_edit', 
            // 'boy-water_edit', 
            'ilm_boat_1_edit', 'omnimatte_drift_smoke_blue_edit', 'davis_drift-chicane_edit', 'davis_camel_edit', 'davis_car-roundabout_edit'],  // first item is default
        'methods': [''], // disabled
        'modes': [''],  // disabled
        'labels': {
            'pexels_car_drift_edit': 	 	 	        ['Foreground', 'Background', 'Mask', '"Red smoke"'],
            'boat-shore_edit': 	 	 	                ['Foreground', 'Background', 'Mask', 'Output'],
            'comp_breakdance-waterfall_edit':           ['Foreground', 'Background', 'Mask', 'Smaller mask on hover'],
            // 'boy-water_edit': 	 	 	                ['Foreground', 'Background', 'Mask', 'Output'],
            'ilm_boat_1_edit': 	 	 	                ['Foreground', 'Background', 'Mask', 'Output'],
            'omnimatte_drift_smoke_blue_edit': 	 	 	['Foreground', 'Background', 'Mask', '"Blue smoke"'],
            'davis_drift-chicane_edit': 	 	 	    ['Foreground', 'Background', 'Mask', '"Red smoke"'],
            'davis_camel_edit': 	 	 	            ['Foreground', 'Background', 'Mask', '"Soft shadow" on hover'],
            'davis_car-roundabout_edit': 	 	 	    ['Foreground', 'Background', 'Mask', '"Harsh shadow" on hover'],
        },
        'columns': 4,
        'is_demo': true,
        'remove_hover': false,
        'current_scene': null,
        'description': `
            Over++ supports editing the generated effect using mask guidance, prompt guidance, or both. 
            We also provide fine-grained control over the effect (e.g., soft vs. harsh shadow in <a onclick="selectSceneByName('effect-editing', 'davis_car-roundabout_edit')">car</a> and <a onclick="selectSceneByName('effect-editing', 'davis_camel_edit')">camel</a>).
            <br>
            Hover to reveal different controls, a gray mask indicates the absence of mask guidance.
        `,
    },
    'effect-keyframe': {
        'scenes': ['davis_miami-surf_keyframe', 
            // 'boy-water_keyframe', 
            'truck-water_keyframe', 'boys-beach_keyframe'],  // first item is default
        'methods': [''], // disabled
        'modes': [''],  // disabled
        'labels': {
            'davis_miami-surf_keyframe':                ['Foreground', 'Background', 'Keyframe mask annotation', 'Output'],
            // 'boy-water_keyframe':                       ['Foreground', 'Background', 'Keyframe mask annotation', 'Output'],
            'boys-beach_keyframe':                      ['Foreground', 'Background', 'Keyframe mask annotation', 'Output'],
            'truck-water_keyframe':                     ['Foreground', 'Background', 'Keyframe mask annotation', 'Output'],
        },
        'columns': 4,
        'is_demo': true,
        'remove_hover': false,
        'current_scene': null,
        'description': `
            Over++ supports keyframe masking for effect generation. By annotating only a keyframe mask, Over++ produces effects that adhere to the keyframe constraints while propagating consistent effects to the remaining frames—without requiring per-frame mask guidance.
            <br>
            Hover to reveal results without keyframe annotation (this is the same setup as effect generation without any guidance shown in <a href="#sec:effect-generation">Sec. I Effect Generation</a>).
        `,
    },
    'effect-background-swap': {
        'scenes': ['davis_breakdance-flare_background-swap', 'comp_breakdance-waterfall-stab_background-swap', 'comp_breakdance-dune-stab_background-swap'],
        'methods': [''], // disabled
        'modes': [''],  // disabled
        'labels': {
            'davis_breakdance-flare_background-swap':           ['Foreground', 'Background', 'Output'],
            'comp_breakdance-waterfall-stab_background-swap':   ['Foreground', 'Background', 'Output'],
            'comp_breakdance-dune-stab_background-swap':        ['Foreground', 'Background', 'Output'],
        },
        'columns': 3,
        'is_demo': true,
        'current_scene': null,
        'description': `
            With the same foreground, Over++ supports background swapping for effect generation. By supplying different background videos, Over++ produces context-aware effects—for example, splashes and reflections (see <a onclick="selectSceneByName('effect-background-swap', 'comp_breakdance-waterfall-stab_background-swap')">waterfall</a>) or dust and shadows (see <a onclick="selectSceneByName('effect-background-swap', 'comp_breakdance-dune-stab_background-swap')">dune</a>).
            <br>
            Hover to visualize the generated effects.
        `,
    },
    'traindata': {
        'scenes': ['car-turn_paired', 'pexels-bike-puddle2_paired', 'chicken_paired', 'kubric-0000039_paired', 'kubric-0000002_paired', 'unpaired-1', 'unpaired-2'],
        'methods': ['paired', 'unpaired'],
        'modes': [''],
        'labels': {
            'pexels-bike-puddle2_paired':       ['Input video w/o effect', 'Target video w/ effect', 'Effect mask'],
            'car-turn_paired':                  ['Input video w/o effect', 'Target video w/ effect', 'Effect mask'],
            'kubric-0000039_paired':            ['Input video w/o effect', 'Target video w/ effect', 'Effect mask'],
            'chicken_paired':                   ['Input video w/o effect', 'Target video w/ effect', 'Effect mask'],
            'kubric-0000002_paired':            ['Input video w/o effect', 'Target video w/ effect', 'Effect mask'],
            'unpaired-1':                       ['T2V video 1', 'T2V video 2', 'T2V video 3'],
            'unpaired-2':                       ['T2V video 1', 'T2V video 2', 'T2V video 3'],
        },
        'enable_scenes': {
            'paired':                           ['car-turn_paired', 'pexels-bike-puddle2_paired', 'chicken_paired', 'kubric-0000039_paired', 'kubric-0000002_paired'],
            'unpaired':                         ['unpaired-1', 'unpaired-2'],
        },
        'method_buttons': {
            'paired': 'Paired Data',
            'unpaired': 'Unpaired Data',
        },
        'columns': 3,
        'is_demo': true,
        'remove_hover': true,
        'current_scene': null,
        'description': `
            Training a video generation model for effect synthesis is challenging due to the scarcity of ideal, annotated video pairs.
            To address this, we leverage prior work to decompose real-world videos into foreground and background layers, yielding a limited set of paired data (w/ and w/o effects).
            We further augment the training set with synthetic, unpaired text-to-video (T2V) samples, resulting in a more abundant collection of unpaired data.
            <br>
            Our final dataset contains ≈50 paired real-world videos, 600 paired synthetic videos, and 500 unpaired synthetic videos—≈1.1K total, which is significantly less than the ≈15K paired videos used in <a href="#ref-forceprompting">Force Prompting</a> for force-guided video generation.
            Click the buttons below for more details.
        `,
        'method_descriptions': {
            'paired': `
            Our model is fine-tuned on paired data comprising both limited real-world and synthetic videos. Each video pair shares the same foreground subjects and background scenes, but differs in the effect regions.
            To obtain paired data, we leverage prior omnimatte-series methods (e.g., <a href="#ref-omnimatte">Omnimatte</a>, <a href="#ref-genomnimatte">GenOmnimatte</a>, and <a href="#ref-omnimatterf">Omnimatte-RF</a>) to decompose real-world videos into foreground and background layers. We further augment the paired dataset with synthetic video pairs collected using <a href="#ref-kubric">Kubric</a> and <a href="#ref-omnimatterf">Movies</a>.
            `,
            'unpaired': `
            We additionally fine-tune on unpaired synthetic data by augmenting captions from the paired dataset, which helps preserve the pretrained model’s original text-to-video editing capabilities after paired fine-tuning, following prior practice (e.g., <a href="#ref-dreambooth">DreamBooth</a>).
            To obtain unpaired data, we generate T2V videos using text prompts from the paired dataset. We also zero out the latent codes of the foreground and background layers for unpaired data when training with unpaired data.
            `,
        }
    },
    'failures': {
        'scenes': ['ilm_PXL_failure', 'davis_boat_failure'],
        'methods': [''], // disabled
        'modes': [''],  // disabled
        'labels': {
            'ilm_PXL_failure':                  ['Foreground', 'Background', 'Output'],
            'davis_boat_failure':               ['Foreground', 'Background', 'Output'],
        },
        'columns': 3,
        'is_demo': true,
        'remove_hover': true,
        'current_scene': null,
        'description': `Our approach still has a few limitations:
        (i) complex physical effects that require detailed video understanding and reasoning—such as generating subtle splashes before stepping into a puddle or animating floating leaves that move with ripples (see <a onclick="selectSceneByName('failures', 'ilm_PXL_failure')">puddle and leaves</a>)—are not always synthesized correctly; and (ii) effect generation with extremely large CFG scales (e.g., <a onclick="selectSceneByName('failures', 'davis_boat_failure')">boat</a>) can lead to color oversaturation <a href="#ref-cfg">(Sadat et al., 2025)</a>.
        `,
    },
    'robustness': {
        'scenes': ['davis_kite-walk_robust', 
            // 'boy-water-2_robust', 
            'davis_breakdance-flare_robust'],
        'methods': [''], // disabled
        'modes': [''],  // disabled
        'labels': {
            'davis_kite-walk_robust':           ['Foreground', 'Background', 'Output'],
            // 'boy-water-2_robust':               ['Foreground', 'Background', 'Output'],
            'davis_breakdance-flare_robust':    ['Foreground', 'Background', 'Output'],
        },
        'columns': 3,
        'is_demo': true,
        'current_scene': null,
        'description': `Our method demonstrates robustness to imprecise mask annotations, effectively handling masks that partially or fully cover foreground objects (see <a onclick="selectSceneByName('robustness', 'davis_kite-walk_robust')">walk</a>) as well as background regions (e.g., ignoring background masks in <a onclick="selectSceneByName('robustness', 'davis_breakdance-flare_robust')">breakdance</a>).
        <br>
        Over++ generates effects through video understanding and reasoning, producing semantically consistent results while robustly interpreting imperfect, real-world user annotations.
        <br>
        Hover to visualize the generated effects.
        `,
    },
    'comparisons': {
        'scenes': [
            'boat-shore_comparison', 
            // 'boy-water_comparison', 
            'davis_breakdance-flare_comparison', 
            'davis_camel_comparison', 'davis_mbike-trick_comparison', 'davis_miami-surf_comparison',
            'davis_parkour_comparison', 'davis_skate-park_comparison', 'davis_snowboard_comparison', 
            'davis_surf_comparison', 'pexels_car_drift_comparison', 'three_swans_lake_comparison',
            'truck-water_comparison'
        ],
        'methods': [''],
        'modes': ['no-mask', 'mask'],
        'mode_labels': {
            'no-mask': 'No-Mask Methods',
            'mask': 'Mask Methods',
        },
        'enable_scenes': {
            'no-mask': ['boat-shore_comparison', 
                // 'boy-water_comparison', 
                'davis_breakdance-flare_comparison', 'davis_camel_comparison', 'davis_parkour_comparison', 'pexels_car_drift_comparison', 'three_swans_lake_comparison', 'truck-water_comparison'],
            'mask': ['boat-shore_comparison', 'davis_camel_comparison', 'davis_mbike-trick_comparison', 'davis_miami-surf_comparison', 'davis_parkour_comparison', 'davis_skate-park_comparison', 'davis_snowboard_comparison', 'davis_surf_comparison', 'pexels_car_drift_comparison', 'truck-water_comparison'],
        },
        'video_labels': {
            'fg': 'Foreground',
            'bg': 'Background',
            'mask': 'Mask',
            'ours': 'Ours',
            'anyv2v': 'AnyV2V',
            'loraedit': 'LoRA Edit',
            'runway': 'Runway',
            'vace': 'VACE',
            'ours_mask': 'Ours (Mask)',
        },
        'is_demo': false,
        'is_comparison': true,
        'current_scene': null,
        'current_mode': null,
        'description': `
            Over++ supports both mask-free and mask-guided effect generation. We compare our method against representative video editing baselines for effect synthesis.
            <ul>
            <li>
                <b>No-mask methods.</b> We compare against first-frame–guided video editing (I+V2V) baselines, where the ground-truth video’s first frame is provided as guidance (<a href="#ref-anyv2v">AnyV2V</a>, <a href="#ref-loraedit">LoRA Edit</a>), as well as context-aware video-to-video (V2V) editing methods (<a href="#ref-runway">Runway Aleph</a>).
            </li>
            <li>
                <b>Mask-guided methods.</b> We compare against mask-guided video editing (M+V2V) baselines that take explicit mask inputs (<a href="#ref-vace">VACE</a>).
            </li>
            </ul>
        `,
    },
}


$(document).ready(function () {
    category_names = [
        'effect-generation',
        'effect-editing',
        'effect-keyframe',
        'effect-background-swap',
        'comparisons',
        'traindata',
        'robustness',
        'failures',
    ];
    for (let i = 0; i < category_names.length; i++) {
        category_name = category_names[i];

        // initialize global-variable active pills
        activeMethodsPill[category_name] = null;
        activeScenesPill[category_name] = null;
        activeModesPill[category_name] = null;

        display_block(category_name);
    }
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    is_mobile = (width <= 768);
});


function onResizeWindow() {
    for (let category_name in category_examples) {
        if (!category_examples[category_name]['is_demo']) {
            video_container = $("#" + category_name + "-video-container");
            if (video_container) {
                video_container.syncer({reset_height: true});
            }
        }
    }
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    is_mobile = (width <= 768);
}


function getSectionTopBottom(section_id) {
    var section = document.getElementById(section_id);
    var rect = section.getBoundingClientRect();
    return {'top': rect.top, 'bottom': rect.bottom};
}


float_navbars = {
    'navbar-apps': ["sec:effect-generation", "sec:effect-editing", "sec:effect-keyframe", "sec:effect-background-swap"],
    'navbar-method': ["sec:comparison", "sec:framework", "sec:traindata", "sec:robustness", "sec:failures"],
}


function updateNavbarsOnScroll() {
    window_height = window.innerHeight;

    for (let navbar_id in float_navbars) {
        let section_ids = float_navbars[navbar_id];
        let navbar = document.getElementById(navbar_id);
        
        var set_navbar = true;
        main_displaying = null;
        for (let i = 0; i < section_ids.length; i++) {
            section_top_bottom = getSectionTopBottom(section_ids[i]);
            section_top = section_top_bottom['top'];
            section_bottom = section_top_bottom['bottom'];

            if (i == 0 && section_top > window_height * 0.05) {
                set_navbar = false;
            }
            if (i == section_ids.length - 1 && section_bottom < window_height / 2) {
                set_navbar = false;
            }
            if (section_top < window_height / 2) {
                main_displaying = section_ids[i];
            }
        }

        if (set_navbar) {
            parent = navbar.parentElement;
            parent_height = parent.getBoundingClientRect().height;
            parent.style.height = parent_height ? parent_height + "px" : "0px";
            navbar.classList.add('navbar-active');
        } else {
            navbar.classList.remove('navbar-active');
        }

        for (let i = 0; i < section_ids.length; i++) {
            btn = document.getElementById(section_ids[i].replace("sec:", "navbar-"));
            btn.classList.remove('active');
        }
        if (main_displaying) {
            main_btn = document.getElementById(main_displaying.replace("sec:", "navbar-"));
            main_btn.classList.add('active');
        }
    }
}

/* ---------------- scroll event handler (comment to disable) --------------- */
$(window).scroll(function(){
    updateNavbarsOnScroll();
});


function display_block(category_name) {
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    is_mobile = (width <= 768);
    div = document.getElementById('div-video-' + category_name);

    /******************************************************************************************************************/

    head = `
        <div class="col-2"></div>
        <div class="col-md-8">
        <script>
            activeMethodsPill['${category_name}'] = document.querySelector('.${category_name}-method-pill.active');
            activeScenesPill['${category_name}'] = document.querySelector('.${category_name}-scene-pill.active');
            activeModesPill['${category_name}'] = document.querySelector('.${category_name}-mode-pill.active');
        </script>
        `;

    /******************************************************************************************************************/
    
    scene = `
            <div class="has-text-centered text-center">
                <div class="pill-row scene-pills" id="${category_name}-scene-pills">
    `;
    let num_scenes = category_examples[category_name]['scenes'].length;
    for (let i = 0; i < num_scenes; i++) {
        if (!is_mobile && num_scenes > 10 && i == Math.ceil(num_scenes / 2)) {
            scene += `<br>`;
        }
        example = category_examples[category_name]['scenes'][i];
        active_class = (i == 0) ? 'active' : '';
        scene += `
                <span id="${category_name}-scene-${example}" class="pill ${category_name}-scene-pill ${active_class}" data-value="${example}" onclick="selectVideo('${category_name}', activeMethodsPill['${category_name}'], this, activeModesPill['${category_name}'])">
                    <img class="thumbnail-img" src="assets/thumbnails/${example}.jpg" width="64">
                </span>
        `;
    }
    scene += `
            </div>
    `;

    /******************************************************************************************************************/

    if (category_examples[category_name]['methods'].length == 1 && category_examples[category_name]['methods'][0] == '') {
        display_method_style = 'display: none;';
    } else {
        display_method_style = '';
    }
    method = `
            <div class="text-center" style="color: black; ${display_method_style}" id="${category_name}-method-pills">
                <div class="btn-group btn-group-sm">
    `;
    for (let i = 0; i < category_examples[category_name]['methods'].length; i++) {
        example = category_examples[category_name]['methods'][i];
        if (category_examples[category_name]['method_buttons'] && category_examples[category_name]['method_buttons'][example]) {
            example_display = category_examples[category_name]['method_buttons'][example];
        } else {
            example_display = example;
        }
        active_class = (i == 0) ? 'active' : '';
        method += `
                <span class="button is-normal ${category_name}-method-pill ${active_class}" data-value="${example}" id="${category_name}-method-${example}"
                    onclick="selectVideo('${category_name}', this, activeScenesPill['${category_name}'], activeModesPill['${category_name}'])">
                    ${example_display}
                </span>
        `;
    }
    method += `
                </div>
            </div>
    `;
    /******************************************************************************************************************/

    description = ``;
    if (category_examples[category_name]['description']) {
        description = `
            <div class="has-text-centered description" id="${category_name}-description">
                <span>${category_examples[category_name]['description']}</span>
            </div>
        `;
    }

    method_description = ``;
    if (category_examples[category_name]['method_descriptions'] && category_examples[category_name]['method_descriptions'][example]) {
        method_description = `
            <div class="has-text-centered description" id="${category_name}-method-description">
                <span></span>
            </div>
        `;
    }

    /******************************************************************************************************************/

    if (category_examples[category_name]['modes'].length == 1 && category_examples[category_name]['modes'][0] == '') {
        display_mode_style = 'display: none';
    } else {
        display_mode_style = '';
    }
    mode = `
            <div class="text-center" style="color: black; ${display_mode_style};" id="${category_name}-mode-pills">
                <div class="btn-group btn-group-sm">
    `;
    for (let i = 0; i < category_examples[category_name]['modes'].length; i++) {
        example = category_examples[category_name]['modes'][i];
        if (category_examples[category_name]['mode_labels'] && category_examples[category_name]['mode_labels'][example]) {
            example_display = category_examples[category_name]['mode_labels'][example];
        } else {
            example_display = example;
        }
        active_class = (i == 0) ? 'active' : '';
        mode += `
                <span class="button is-normal ${category_name}-mode-pill ${active_class}" data-value="${example}" id="${category_name}-mode-${example}"
                    onclick="selectVideo('${category_name}', activeMethodsPill['${category_name}'], activeScenesPill['${category_name}'], this)">
                    ${example_display}
                </span>
        `;
    }
    mode += `
                </div>
            </div>
    `;

    /******************************************************************************************************************/

    video_container = `
            <div id="${category_name}-video-container">
            </div>
    `;
    if (category_examples[category_name]['is_demo']) {
        label = `
                <div class='columns' id='${category_name}-labels'>
                    <div class="column has-text-centered demo-video-label">
                        Input
                    </div>
                    <div class="column has-text-centered demo-video-label">
                        Output
                    </div>
                </div>
                <br>
        `;
    } else {
        label = ``;
    }

    /******************************************************************************************************************/

    foot = `
        </div>
        <div class="col-2"></div>
        
    `;
    if (category_examples[category_name]['is_demo']) {
        remove_hover = category_examples[category_name]['remove_hover'] === true;
        if (!is_mobile) {
            if (remove_hover) {
                instruction = `
                <div class='has-text-centered demo-video-instruction'>
                    <div class="instruction-centered">
                        <p>
                            <span class="icon">
                                <i class="far fa-hand-point-up"></i>
                            </span>Click video to pause
                            &nbsp;&nbsp;&nbsp;&nbsp; 
                            <span class="icon">
                                <i class="fas fa-download"></i>
                            </span>Download [<u><a id="${category_name}-download-video" target="_blank" href="" download="">video</a></u>]
                            &nbsp;&nbsp;&nbsp;&nbsp;                       
                            <a href="#top"><span class="icon">
                                <i class="fas fa-chevron-up"></i>
                            </span>Back to top</a>
                        </p>
                    </div>
                </div>
                `;
            } else {
                instruction = `
                <div class='has-text-centered demo-video-instruction'>
                    <div class="instruction-centered">
                        <p>
                            <span class="icon">
                                <i class="far fa-hand-paper"></i>
                            </span>Hover on video to toggle control
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span class="icon">
                                <i class="far fa-hand-point-up"></i>
                            </span>Click video to pause
                            &nbsp;&nbsp;&nbsp;&nbsp;                        
                            <span class="icon">
                                <i class="fas fa-download"></i>
                            </span>Download [<u><a id="${category_name}-download-video" target="_blank" href="" download="">video</a></u> / 
                                <u><a id="${category_name}-download-video-tracks" target="_blank" href="" download="">video on hover</a></u>]
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <a href="#top"><span class="icon">
                                <i class="fas fa-chevron-up"></i>
                            </span>Back to top</a>
                        </p>
                    </div>
                </div>
                `;
            }
        } else {
            instruction = `
            <div class='has-text-centered demo-video-instruction'>
                <div class="instruction-centered">
                    <p>
                        <span class="icon">
                            <i class="far fa-hand-point-up"></i>
                        </span>Touch video to ${remove_hover ? 'pause' : 'toggle track overlay'}
                    </p>
                </div>
            </div>
            `;
        }
        
    } else if (category_examples[category_name]['is_teaser'] == null || !category_examples[category_name]['is_teaser']) {
        if (!is_mobile) {
            instruction = `
            <div class='has-text-centered demo-video-instruction'>
                <br>
                <div class="instruction-centered">
                    <p>
                        <span class="icon">
                            <i class="far fa-hand-point-up"></i>
                        </span>Click video to pause
                        &nbsp;&nbsp;&nbsp;
                        <a href="#top"><span class="icon">
                            <i class="fas fa-chevron-up"></i>
                        </span>Back to top</a>
                    </p>
                </div>
            </div>
            `;
        } else {
            instruction = `
            <div class='has-text-centered demo-video-instruction'>
                <div class="instruction-centered">
                    <p>
                        <span class="icon">
                            <i class="far fa-hand-point-up"></i>
                        </span>Touch video to pause
                    </p>
                </div>
            </div>
            `;
        }
    } else {
        instruction = ``;
    }
    foot += instruction;

    /******************************************************************************************************************/
    if (category_examples[category_name]['is_teaser']) {
        div.innerHTML = head + method + method_description + mode + video_container + scene + foot;
    } else {
        div.innerHTML = head + description + method + method_description + mode + scene + video_container + label + foot;
    }
    activeMethodsPill[category_name] = document.querySelector('.' + category_name + '-method-pill.active');
    activeScenesPill[category_name] = document.querySelector('.' + category_name + '-scene-pill.active');
    activeModesPill[category_name] = document.querySelector('.' + category_name + '-mode-pill.active');

    // load default video
    if (category_examples[category_name]['is_demo']) {
        selectVideo(category_name, activeMethodsPill[category_name], activeScenesPill[category_name], activeModesPill[category_name]);
    } else {
        selectVideo(category_name, activeMethodsPill[category_name], activeScenesPill[category_name], activeModesPill[category_name]);
    }

}


function loadDemoVideoContainer(video_container, category_name, scene, method, mode) {
    filename = scene;
    if (method && method != '') {
        filename = `${method}/${filename}`;
    }
    if (mode && mode != '') {
        filename = `${filename}-${mode}`;
    }

    // Check if hover functionality should be removed
    remove_hover = category_examples[category_name]['remove_hover'] === true;

    current_filename = category_examples[category_name]['current_scene'];
    if (current_filename == null) {
        if (remove_hover) {
            // Side-by-side layout without hover slider
            video_container.innerHTML = `
                <div>
                    <div class="video">
                        <video class="video demo-video" style="width: 100%;" id="${category_name}Video0" loop playsinline autoplay muted>
                            <source src="./assets/videos/${category_name}/${filename}.mp4" />
                        </video>
                    </div>
                </div>
            `;
        } else {
            // Original twentytwenty slider layout
            video_container.innerHTML = `
                <div class="twentytwenty-container" id="${category_name}-video-twentytwenty">
                    <div class="video">
                        <video class="video demo-video" style="width: 100%;" id="${category_name}Video0" loop playsinline autoplay muted>
                            <source src="./assets/videos/${category_name}/${filename}.mp4" />
                        </video>
                    </div>
                    <div class="video">
                        <video class="video demo-video" style="width: 100%;" id="${category_name}Video1" loop playsinline autoplay muted>
                            <source src="./assets/videos/${category_name}/${filename}-tracks.mp4" />
                        </video>
                    </div>
                </div>
            `;
        }
    } else if (current_filename != filename) {
        video_container.innerHTML = video_container.innerHTML.replaceAll(current_filename, filename);
    }
    category_examples[category_name]['current_scene'] = filename;
    var video_active0 = document.getElementById(category_name + "Video0");
    var video_active1 = document.getElementById(category_name + "Video1");

    video_active0.load();
    if (video_active1) {
        video_active1.load();
    }
    
    function _play_together() {
        if (remove_hover) {
            // Single video case
            if (video_active0 && video_active0.readyState >= 4) {
                video_active0.play();
            } else if (video_active0) {
                setTimeout(_play_together, 100);
            }
        } else {
            // Two videos case (with hover)
            if (video_active0 && video_active1 && video_active0.readyState >= 4 && video_active1.readyState >= 4) {
                video_active0.play();
                video_active1.play();
            } else {
                setTimeout(_play_together, 100);
            }
        }
    }
    _play_together();

    // Only initialize twentytwenty if hover is not removed
    if (!remove_hover) {
        // Reinitialize twentytwenty if needed
        two_column_ratio = 0.285;
        three_column_ratio = 0.19;
        four_column_ratio = 0.15;

        if (category_examples[category_name]['columns'] == 2) {
            ratio = two_column_ratio;
        } else if (category_examples[category_name]['columns'] == 3) {
            ratio = three_column_ratio;
        } else if (category_examples[category_name]['columns'] == 4) {
            ratio = four_column_ratio;
        }
        else {
            ratio = two_column_ratio;
        }

        if (window.jQuery && $.fn.twentytwenty) {
            $("#" + category_name + "-video-twentytwenty").twentytwenty({ ratio: ratio, hover_to_leftmost: true, default_offset_pct: 0.999, disable_resize: false, is_mobile: is_mobile  });
        }
    } else {
        // Use syncer for videos when hover is removed
        // Initialize syncer after a small delay to ensure DOM is ready
        // setTimeout(function() {
        //     if (window.jQuery && $.fn.syncer) {
        //         var container = $("#" + category_name + "-video-container");
        //         if (container.length) {
        //             container.syncer({
        //                 reset_height: true,
        //                 click_to_pause: true,
        //                 hover_to_sync: false
        //             });
        //         }
        //     }
        // }, 100);
        if (window.jQuery && $.fn.syncer) {
            var container = $("#" + category_name + "-video-container");
            if (container.length) {
                container.syncer({
                    reset_height: true,
                    click_to_pause: true,
                    hover_to_sync: false
                });
            }
        }
    }

    // load labels
    labels = category_examples[category_name]['labels'][scene];
    console.log(labels);
    labels_div = document.getElementById(category_name + "-labels");
    labels_HTML = ""
    for (let i = 0; i < labels.length; i++) {
        labels_HTML += `
            <div class="column has-text-centered demo-video-label">
                ${labels[i]}
            </div>
        `;
    }
    labels_div.innerHTML = labels_HTML;

    // load method description
    if (category_examples[category_name]['method_descriptions'] && category_examples[category_name]['method_descriptions'][method]) {
        method_description_div = document.getElementById(category_name + "-method-description");
        method_description_div.innerHTML = `<span>${category_examples[category_name]['method_descriptions'][method]}</span>`;
    }

    // update download links
    download_link = document.getElementById(category_name + "-download-video");
    if (download_link) {
        download_link.href = `./assets/videos/${category_name}/${filename}.mp4`;
        download_link.download = `${category_name}-${filename}.mp4`;
    }

    download_link_tracks = document.getElementById(category_name + "-download-video-tracks");
    if (download_link_tracks) {
        download_link_tracks.href = `./assets/videos/${category_name}/${filename}-tracks.mp4`;
        download_link_tracks.download = `${category_name}-${filename}-tracks.mp4`;
    }

}

function loadComparisonVideoContainer(video_container, category_name, method_name, scene, mode) {

    video_labels = category_examples[category_name]['video_labels'];
    current_scene = category_examples[category_name]['current_scene'];
    current_mode = category_examples[category_name]['current_mode'];

    init_sync = true;

    if (current_scene == null || current_mode == null) {
        // First load - build full HTML
        if (mode == 'no-mask') {
            video_container.innerHTML = `
                <div class="columns">
                    <div class="column comparison-video-div">
                        <video class="comparison-video" loop playsinline muted>
                            <source src="./assets/videos/${category_name}/${scene}/fg.webm" />
                        </video>
                        <div class="has-text-centered demo-video-label">${video_labels['fg']}</div>
                    </div>
                    <div class="column comparison-video-div">
                        <video class="comparison-video" loop playsinline muted>
                            <source src="./assets/videos/${category_name}/${scene}/bg.webm" />
                        </video>
                        <div class="has-text-centered demo-video-label">${video_labels['bg']}</div>
                    </div>
                    <div class="column comparison-video-div">
                        <video class="comparison-video" loop playsinline muted>
                            <source src="./assets/videos/${category_name}/${scene}/ours.webm" />
                        </video>
                        <div class="has-text-centered demo-video-label">${video_labels['ours']}</div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column comparison-video-div">
                        <video class="comparison-video" loop playsinline muted>
                            <source src="./assets/videos/${category_name}/${scene}/anyv2v.webm" />
                        </video>
                        <div class="has-text-centered demo-video-label">${video_labels['anyv2v']}</div>
                    </div>
                    <div class="column comparison-video-div">
                        <video class="comparison-video" loop playsinline muted>
                            <source src="./assets/videos/${category_name}/${scene}/loraedit.webm" />
                        </video>
                        <div class="has-text-centered demo-video-label">${video_labels['loraedit']}</div>
                    </div>
                    <div class="column comparison-video-div">
                        <video class="comparison-video" loop playsinline muted>
                            <source src="./assets/videos/${category_name}/${scene}/runway.webm" />
                        </video>
                        <div class="has-text-centered demo-video-label">${video_labels['runway']}</div>
                    </div>
                </div>
            `;
        } else if (mode == 'mask') {
            video_container.innerHTML = `
                <div class="columns">
                    <div class="column is-one-third comparison-video-div">
                        <video class="comparison-video" loop playsinline muted>
                            <source src="./assets/videos/${category_name}/${scene}/fg.webm" />
                        </video>
                        <div class="has-text-centered demo-video-label">${video_labels['fg']}</div>
                    </div>
                    <div class="column is-one-third comparison-video-div">
                        <video class="comparison-video" loop playsinline muted>
                            <source src="./assets/videos/${category_name}/${scene}/bg.webm" />
                        </video>
                        <div class="has-text-centered demo-video-label">${video_labels['bg']}</div>
                    </div>
                    <div class="column is-one-third comparison-video-div">
                        <video class="comparison-video" loop playsinline muted>
                            <source src="./assets/videos/${category_name}/${scene}/mask.webm" />
                        </video>
                        <div class="has-text-centered demo-video-label">${video_labels['mask']}</div>
                    </div>
                </div>
                <div class="columns is-centered">
                    <div class="column is-one-third comparison-video-div">
                        <video class="comparison-video" loop playsinline muted>
                            <source src="./assets/videos/${category_name}/${scene}/ours_mask.webm" />
                        </video>
                        <div class="has-text-centered demo-video-label">${video_labels['ours_mask']}</div>
                    </div>
                    <div class="column is-one-third comparison-video-div">
                        <video class="comparison-video" loop playsinline muted>
                            <source src="./assets/videos/${category_name}/${scene}/vace.webm" />
                        </video>
                        <div class="has-text-centered demo-video-label">${video_labels['vace']}</div>
                    </div>
                </div>
            `;
        }
    } else if (current_mode != mode) {
        // Mode changed - rebuild HTML with new layout
        category_examples[category_name]['current_scene'] = null;
        category_examples[category_name]['current_mode'] = null;
        loadComparisonVideoContainer(video_container, category_name, method_name, scene, mode);
        return;
    } else if (current_scene != scene && current_mode == mode) {
        // Same mode but different scene - use replaceAll to swap scene names
        console.log('replace comparison videos - scene changed');
        video_container.innerHTML = video_container.innerHTML.replaceAll(current_scene, scene);
    } else {
        // Same scene and mode - no rebuild needed
        init_sync = false;
    }

    category_examples[category_name]['current_scene'] = scene;
    category_examples[category_name]['current_mode'] = mode;

    if (init_sync && window.jQuery && $.fn.syncer) {
        $("#" + category_name + "-video-container").syncer();
    }
}


function loadVideoContainer(video_container, category_name, method_name, scene, mode) {

    innerHTML = ``;
    for (r = 0; r < category_examples[category_name]['method_columns'][method_name].length; r++) {
        innerHTML += `<div class="columns">`;
        for (c = 0; c < category_examples[category_name]['method_columns'][method_name][r].length; c++) {
            col_suffix = category_examples[category_name]['method_columns'][method_name][r][c];
            if (col_suffix == '') {
                col_suffix = mode;
            }
            filename = `${method_name}/${scene}-${col_suffix}`;
            console.log(filename);
            label = col_suffix;
            column_labels = category_examples[category_name]['column_labels'];
            if (column_labels && column_labels[method_name] && column_labels[method_name][scene] && column_labels[method_name][scene][col_suffix]) {
                label = column_labels[method_name][scene][col_suffix];
            }
            innerHTML += `
                <div class="column">
                    <video class="comparison-video"  loop playsinline muted>
                        <source src="./assets/videos/${category_name}/${filename}.mp4" />
                    </video>
                    <div class="has-text-centered demo-video-label">
                        ${label}
                    </div>
                </div>
            `;
        }
        innerHTML += `</div>`;
    }

    video_container.innerHTML = innerHTML;
    if (window.jQuery && $.fn.syncer) {
        $("#" + category_name + "-video-container").syncer({reset_height: true});
    }

    // load method description
    if (category_examples[category_name]['method_descriptions'] && category_examples[category_name]['method_descriptions'][method]) {
        method_description_div = document.getElementById(category_name + "-method-description");
        method_description_div.innerHTML = `<span>${category_examples[category_name]['method_descriptions'][method]}</span>`;
    }
}


function loadTeaserVideoContainer(video_container, category_name, scene) {
    filename = scene;
    if (method && method != '') {
        filename = `${method}/${filename}`;
    }
    if (mode && mode != '') {
        filename = `${filename}-${mode}`;
    }

    current_filename = category_examples[category_name]['current_scene'];
    if (current_filename == null) {
        video_container.innerHTML = `
            <div class="video">
                <video class="video demo-video" style="width: 100%;" id="${category_name}Video0" loop playsinline autoplay muted>
                    <source src="./assets/videos/${category_name}/${filename}.mp4" />
                </video>
            </div>
        `;

        function fixHeight() {
            fixed = false;
            videos = $(video_container).find("video");
            all_videos_loaded = true;
            console.log(videos);
            for (let i = 0; i < videos.length; i++) {
                if (videos[i].readyState < 3) {
                    all_videos_loaded = false;
                }
            }
            if (all_videos_loaded) {
                $(video_container).css("height", $(video_container).height() + "px");
                fixed = fixed | true;
            }
            return fixed;
        }
        function tryFixHeight() {
            let fixed = fixHeight();
            if (!fixed) {
                setTimeout(function() {
                    tryFixHeight();
                }, 100);
            }
        }
        setTimeout(function() {
            tryFixHeight();
        }, 500);

    } else if (current_filename != filename) {
        video_container.innerHTML = video_container.innerHTML.replaceAll(current_filename, filename);
    }
    category_examples[category_name]['current_scene'] = filename;

    
}


function selectVideo(category_name, methodPill, scenePill, modePill) {
    select = true;
    if (category_examples[category_name]["methods"].length > 1 && methodPill.classList.contains("disabled")) {
        return;
    }
    if (activeMethodsPill[category_name]) {
        activeMethodsPill[category_name].classList.remove("active");
    }

    if (activeScenesPill[category_name]) {
        activeScenesPill[category_name].classList.remove("active");
    }

    if (modePill) {
        activeModesPill[category_name].classList.remove("active");
        modePill.classList.add("active");
        activeModesPill[category_name] = modePill;
    }

    activeMethodsPill[category_name] = methodPill;
    activeScenesPill[category_name] = scenePill;
    scenePill.classList.add("active");
    activeMethodsPill[category_name].classList.add("active");
    scene = scenePill.getAttribute("data-value");
    method = activeMethodsPill[category_name].getAttribute("data-value");
    mode = activeModesPill[category_name].getAttribute("data-value");

    scenes = category_examples[category_name]['scenes'];

    modes = category_examples[category_name]['modes'];
    first_active_mode_btn = null;
    if (modes.length > 1 && modes[0] != '') {
        for (let i = 0; i < modes.length; i++) {
            btn_mode = document.getElementById(category_name + "-mode-" + modes[i]);
            enable_modes = category_examples[category_name]['enable_modes'];
            if (enable_modes && enable_modes[method] && !enable_modes[method].includes(modes[i])) {
                btn_mode.style.display = "none";
            } else {
                if (first_active_mode_btn == null) {
                    first_active_mode_btn = btn_mode;
                }
                btn_mode.style.display = "inline-flex";
            }
        }
        document.getElementById(category_name + "-mode-pills").style.display = "block";
        if (modePill.style.display == "none") {
            // select the first available mode
            if (first_active_mode_btn != null) {
                selectVideo(category_name, activeMethodsPill[category_name], activeScenesPill[category_name], first_active_mode_btn);
                return;
            }
            document.getElementById(category_name + "-mode-pills").style.display = "none";
        }
    }

    enable_scenes = category_examples[category_name]['enable_scenes'];
    // Check for mode-based filtering first (for comparisons), then fall back to method-based
    enable_scenes_key = (enable_scenes && enable_scenes[mode]) ? mode : method;
    enable_scenes_list = enable_scenes ? enable_scenes[enable_scenes_key] : null;
    
    if (enable_scenes_list && enable_scenes_list.length == 1) {
        document.getElementById(category_name + "-scene-pills").style.display = "none";
    } else {
        document.getElementById(category_name + "-scene-pills").style.display = "block";
    }

    first_active_scene_btn = null;
    for (let i = 0; i < scenes.length; i++) {
        btn_scene = document.getElementById(category_name + "-scene-" + scenes[i]);
        if (enable_scenes_list && !enable_scenes_list.includes(scenes[i])) {
            btn_scene.style.display = "none";
        } else {
            if (first_active_scene_btn == null) {
                first_active_scene_btn = btn_scene;
            }
            btn_scene.style.display = "inline-flex";
        }
    }
    if (scenePill.style.display == "none") {
        // select the first available scene
        selectVideo(category_name, activeMethodsPill[category_name], first_active_scene_btn, activeModesPill[category_name]);
        return;
    }

    methods = category_examples[category_name]['methods'];
    enable_methods = category_examples[category_name]['enable_methods'];
    first_active_method_btn = null;
    for (let i = 0; i < methods.length; i++) {
        btn_method = document.getElementById(category_name + "-method-" + methods[i]);
        if (enable_methods && enable_methods[scene] && !enable_methods[scene].includes(methods[i])) {
            // btn_method.style.display = "none";
            btn_method.classList.add("disabled");
        } else {
            if (first_active_method_btn == null) {
                first_active_method_btn = btn_method;
            }
            // btn_method.style.display = "inline-flex";
            btn_method.classList.remove("disabled");
        }
    }
    if (methodPill.classList.contains("disabled")) {
        // select the first available method
        selectVideo(category_name, first_active_method_btn, activeScenesPill[category_name], activeModesPill[category_name]);
        return;
    }

    video_container = document.getElementById(category_name + "-video-container");

    if (category_examples[category_name]['is_demo']) {
        loadDemoVideoContainer(video_container, category_name, scene, method, mode);
    } else if (category_examples[category_name]['is_comparison']) {
        loadComparisonVideoContainer(video_container, category_name, method, scene, mode);
    } else if (category_examples[category_name]['is_teaser']) {
        loadTeaserVideoContainer(video_container, category_name, scene);
    } else {
        loadVideoContainer(video_container, category_name, method, scene, mode);
    }

}


function selectSceneByName(category_name, scene, method=null) {
    if (method == null) {
        method_ele = activeMethodsPill[category_name];
    } else {
        method_ele = document.getElementById(category_name + "-method-" + method);
    }
    selectVideo(
        category_name,
        method_ele,
        document.getElementById(category_name + "-scene-" + scene),
        activeModesPill[category_name]
    );
}

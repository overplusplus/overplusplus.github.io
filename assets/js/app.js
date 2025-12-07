
var activeMethodsPill = {};
var activeScenesPill = {};
var activeModesPill = {};

var is_mobile = false;

category_examples = {
    'teaser': {
        'scenes': ['woman-office', 'wallaby', 'three-skaters'],
        'methods': [''], // disabled
        'modes': [''],  // disabled
        'labels': {
            'three-skaters': [],
            'woman-office': [],
        },
        'columns': 2,
        'is_demo': false,
        'is_comparison': false,
        'is_teaser': true,
        'current_scene': null,
    },
    'joint-motion': {
        'scenes': [
            'biker-delivery', 'woman-yellow-wall', 'bullfight', 'billiards', 'kids-soccer', 'four-women-dance', 'karate', 'paint',
            'woman-office', 'six-people-swim', 'three-skaters', 'corgi-snow', 'seal', 'sea-turtle', 'woman-shiba', 'two-wallabies', 'tunnel-run',
        ],  // first item is default
        'methods': [''], // disabled
        'modes': [''],  // disabled
        'labels': {
            'bullfight':            ['Input', 'Stabilize camera motion & Stabilize objects\' motions'],
            'woman-yellow-wall':    ['Input', 'Camera: pan left; Object: moonwalk'],
            'paint':                ['Input', 'Camera: unchanged; Object: adjust hand movement'],
            'kids-soccer':          ['Input', 'Camera: unchanged; Object: make a spiral ball trajectory'],
            'four-women-dance':     ['Input', 'Camera: unchanged; Object: sync their dance poses'],
            'karate':               ['Input', 'Camera: unchanged; Object: make the girl perform karate with the master'],
            'billiards':            ['Input', 'Camera: move up; Object: adjust the yellow ball\'s trajectory'],
            'woman-office':         ['Input', 'Camera: move up; Object: shrink and make her walk on the desk'],
            'six-people-swim':      ['Input', 'Camera: static; Object: equalize jumping height and falling timing'],
            'three-skaters':        ['Input', 'Camera: move right; Object: adjust skateboarders\' paths'],
            'biker-delivery':       ['Input', 'Camera: unchanged; Object: make the biker fly'],
            'corgi-snow':           ['Input', 'Camera: unchanged; Object: make the corgi fly'],
            'seal':                 ['Input', 'Camera: arc left; Object: unchanged'],
            'sea-turtle':           ['Input', 'Camera: static; Object: unchanged'],
            'woman-shiba':          ['Input', 'Camera: move from right to left; Object: unchanged'],
            'two-wallabies':        ['Input', 'Camera: move from left to right; Object: unchanged'],
            'tunnel-run':           ['Input', 'Stabilize camera motion; Object: unchanged'],
        },
        'columns': 2,
        'is_demo': true,
        'current_scene': null,
        'description': `
            Edit camera and/or object motions using edited 3D point tracks and camera poses.
            We also support complex human motion transfer via SMPL-X human representation (See <a onclick="selectSceneByName('joint-motion', 'four-women-dance')">dance</a> and <a onclick="selectSceneByName('joint-motion', 'karate')">karate</a> examples).
            <br><br>
            Note that our model is conditioned on all track correspondence (visible or occluded), allowing it to automatically handle visibility during 3D motion editing.
            Therefore, our track visualizations display all tracks, including those that may be occluded in certain frames.
        `,
    },
    'shape-deform': {
        'scenes': ['dachshund', 'cat-sniff-food', 'dog-sofa', 'ride-horse', 'wallaby', 'kid-door', 'flamingo', 'newspaper', 'white-swan'],  // first item is default
        'methods': [''], // disabled
        'modes': [''],  // disabled
        'labels': {
            'cat-sniff-food':       ['Input', 'Enlarge the cat\'s head'],
            'wallaby':              ['Input', 'Camera: arc right; Object: make the wallaby stand up'],
            'ride-horse':           ['Input', 'Camera: unchanged; Object: make the horse stand up'],
            'dog-sofa':             ['Input', 'Enlarge the dog\'s head'],
            'dachshund':            ['Input', 'Stretch the dachshund\'s body'],
            'kid-door':             ['Input', 'Enlarge the kid when passing through the door'],
            'flamingo':             ['Input', 'Extend the flamingo\'s legs'],
            'newspaper':            ['Input', 'Tear the newspaper'],
            'white-swan':           ['Input', 'Bend the swan\'s head down'],
        },
        'columns': 2,
        'is_demo': true,
        'current_scene': null,
        'description': `Deform dynamic object shapes by applying different 3D transformations to body parts' 3D tracks`,
    },
    'removal-duplicate': {
        'scenes': ['petting-cat', 'kid-puppets', 'yoga-beach', 'proposal', 'wooden-dinosaur', 'six-people-swim', 'penguin', 'meerkat'],  // first item is default
        'methods': [''], // disabled
        'modes': [''],  // disabled
        'labels': {
            'kid-puppets':          ['Input', 'Remove the kid'],
            'yoga-beach':           ['Input', 'Remove the man & shift the camera trajectory'],
            'proposal':             ['Input', 'Remove the photographer & adjust the camera trajectory'],
            'petting-cat':          ['Input', 'Remove the hands & make the camera static'],
            'wooden-dinosaur':      ['Input', 'Remove the hand & pan the camera left'],
            'six-people-swim':      ['Input', 'Remove all people & make the camera static'],
            'penguin':              ['Input', 'Duplicate the penguin'],
            'meerkat':              ['Input', 'Duplicate the meerkat'],
        },
        'columns': 2,
        'is_demo': true,
        'current_scene': null,
        'description': `We perform object removal by moving object tracks off-screen, or duplication by replicating object's tracks. Notably, our method also supports simultaneous camera motion editing (see <a onclick="selectSceneByName('removal-duplicate', 'proposal')">couple</a>) and applying different 3D transformations to each duplicate (see <a onclick="selectSceneByName('removal-duplicate', 'penguin')">penguin</a>).`,
    },
    'partial': {
        'scenes': ['cat-stand', 'goat', 'band', 't-rex', 'dog-beach', 'woman-run'],
        'methods': [''], // disabled
        'modes': [''],  // disabled
        'labels': {
            'goat':         ['Input', 'Output', "Warped reference"],
            'cat-stand':    ['Input', 'Output', "Warped reference"],
            'band':         ['Input', 'Output', "Warped reference"],
            't-rex':        ['Input', 'Output', "Warped reference"],
            'dog-beach':    ['Input', 'Output', "Warped reference"],
            'woman-run':    ['Input', 'Output', "Warped reference"],
        },
        'columns': 3,
        'is_demo': true,
        'current_scene': null,
        'description': `By specifying only the body motion and removing leg tracks (via a bounding box), our model can synthesize correct leg motion without explicit controls. This allows for easier 3D track editing without requiring dense, full-object motion specifications.`,
    },
    'threed-control': {
        'scenes': ['toy-dinosaurs', 'woman-yoga', 'cake'],
        'methods': [''], // disabled
        'modes': [''],  // disabled
        'labels': {
            'toy-dinosaurs':    ['Input', 'Left dinosaur in front', 'Right dinosaur in front'],
            'cake':             ['Input', 'Rotate clockwise', 'Rotate counter-clockwise'],
            'woman-yoga':       ['Input', 'Rotate clockwise', 'Rotate counter-clockwise'],
        },
        'columns': 3,
        'is_demo': true,
        'current_scene': null,
        'description': `Our method leverages 3D point tracks for precise 3D object motion control, accurately handling <a onclick="selectSceneByName('threed-control', 'toy-dinosaurs')">object depth order (tracks visualized with depth values)</a> and occlusions/disocclusions during <a onclick="selectSceneByName('threed-control', 'woman-yoga')">3D rotations</a>.`,
    },
    'failures': {
        'scenes': ['pour-coffee', 'jump-boat'],
        'methods': [''], // disabled
        'modes': [''],  // disabled
        'labels': {
            'beer':         ['Input', 'Output', 'Warped reference'],
            'pour-coffee':  ['Input', 'Output', 'Warped reference'],
            'volleyball':   ['Input', 'Output', 'Warped reference'],
            'mopping':      ['Input', 'Output', 'Warped reference'],
        },
        'columns': 3,
        'is_demo': true,
        'current_scene': null,
        'description': `Our approach still has a few limitations:
        (i) complex, motion-dependent physical effects (e.g., liquid dynamics like <a onclick="selectSceneByName('failures', 'pour-coffee')">coffee and milk mixing</a>) are not synthesized correctly,
        and (ii) small objects with large motion changes (e.g., <a onclick="selectSceneByName('failures', 'jump-boat')">a 270&deg front-flip</a>) can suffer distortions when their tracks are densely clustered and noisy.
        `,
    },
    'comparisons': {
        'scenes': ['car-turn', 'sea-turtle', 'three-skaters', 'man-jump-water', 'seal', 'cake'],
        'methods': ['ATI', 'DaS', 'PaC', 'ReVideo', 'TrajAttn', 'GEN3C', 'TrajCrafter', 'ReCamMaster'],
        'modes': [''],
        'labels': {
            'three-skaters':    ['Input video warped by target motion <br> Camera: move right; Object: adjust skateboarders\' paths'],
            'seal':             ['Input video warped by target motion <br> Camera: arc left; Object: unchanged'],
            'car-turn':         ['Input video warped by target motion <br> Camera: unchanged; Object: rotate the car to make it drift'],
            'cake':             ['Input video warped by target motion <br> Camera: static; Object: rotate the cake'],
            'sea-turtle':       ['Input video warped by target motion <br> Camera: static; Object: unchanged'],
            'man-jump-water':   ['Input video warped by target motion <br> Camera: move left; Object: adjust falling location'],
            'mochi':            ['Ground-truth'],
            'backpack':         ['Ground-truth'],
        },
        'method_labels': {
            'DaS':              'Diffusion as Shader<br>(track-conditioned I2V)',
            'ATI':              'ATI<br>(track-conditioned I2V)',
            'PaC':              'Perception as Control<br>(track-conditioned I2V)',
            'ReVideo':          'ReVideo<br>(track-conditioned IV2V)',
            'GEN3C':            'GEN3C<br>(Camera-controlled inpainting-based V2V)',
            'TrajCrafter':      'Trajectory Crafter<br>(Camera-controlled inpainting-based V2V)',
            'TrajAttn':         'Trajectory Attention<br>(track-conditioned I2V with an NVS-Solver extension)',
            'ReCamMaster':      'ReCamMaster<br>(Camera-controlled V2V)',
        },
        'enable_methods': {
            'three-skaters':    ['ATI', 'DaS', 'PaC', 'GEN3C', 'TrajCrafter', 'TrajAttn', 'ReVideo'],
            'car-turn':         ['ATI', 'DaS', 'PaC', 'GEN3C', 'TrajCrafter', 'TrajAttn', 'ReVideo'],
            'cake':             ['ATI', 'DaS', 'PaC', 'GEN3C', 'TrajCrafter', 'TrajAttn', 'ReVideo'],
            'sea-turtle':       ['ATI', 'DaS', 'PaC', 'GEN3C', 'TrajCrafter', 'TrajAttn', 'ReVideo', 'ReCamMaster'],
            'seal':             ['ATI', 'DaS', 'PaC', 'GEN3C', 'TrajCrafter', 'TrajAttn', 'ReVideo', 'ReCamMaster'],
            'man-jump-water':   ['ATI', 'DaS', 'PaC', 'GEN3C', 'TrajCrafter', 'TrajAttn', 'ReVideo'],
        },
        'is_demo': false,
        'is_comparison': true,
        'current_scene': null,
        'current_method': null,
        'description': `
            Existing methods have limitations in jointly editing camera and object motions while preserving scene context:
            <ul>
                <li> <b>Track-conditioned image-to-video (I2V)</b> methods (<a href="#ref-das">DaS</a>, <a href="#ref-ati">ATI</a>, <a href="#ref-pac">PaC</a>) generate videos from a single frame,
                    while <a href="#ref-revideo">ReVideo</a> and the extended <a href="#ref-trajattn">TrajAttn</a> additionally takes a masked video input (cropped background or warped frames), these methods  <a onclick="selectSceneByName('comparisons', 'car-turn', 'ATI')">lose the full scene context</a> of the input video.</li>
                </li>
                <li> <b>Camera-controlled video-to-video (V2V)</b> approaches (<a href="#ref-gen3c">GEN3C</a>, <a href="#ref-trajcrafter">TrajCrafter</a>) inpaint from the warped input video but fails to <a onclick="selectSceneByName('comparisons', 'car-turn', 'GEN3C')">shadows</a> or <a onclick="selectSceneByName('comparisons', 'man-jump-water', 'TrajCrafter')">water splashes</a> of the edited objects.
                    <a href="#ref-recamaster">ReCamMaster</a> directly inputs the target camera extrinsics (see camera-only editing cases, <a onclick="selectSceneByName('comparisons', 'sea-turtle', 'ReCamMaster')">sea turtle</a> and <a onclick="selectSceneByName('comparisons', 'seal', 'ReCamMaster')">seal</a>).
                    We observed that ReCamMaster fails in specific fixed-viewpoint cases (e.g., <a onclick="selectSceneByName('comparisons', 'sea-turtle', 'ReCamMaster')">sea turtle</a>), likely because such scenarios were not adequately represented in its training data.
                </li>
            </ul>
            In contrast, our method conditions on the entire unmasked input video and the pair of input and target 3D tracks for joint camera and object motion editing with the consistency of the original scene context.
        `,
    },
    'traindata': {
        'scenes': ['syn-exp1', 'syn-exp2', 'real-exp1', 'real-exp2'],
        'methods': ['synthetic', 'real'],
        'modes': [''],
        'labels': {
            'syn-exp1':     ['Training input', 'Ground-truth'],
            'syn-exp2':     ['Training input', 'Ground-truth'],
            'real-exp1':    ['Training input', 'Target output'],
            'real-exp2':    ['Training input', 'Target output'],
        },
        'enable_scenes': {
            'synthetic':    ['syn-exp1', 'syn-exp2'],
            'real':         ['real-exp1', 'real-exp2'],
        },
        'method_buttons': {
            'synthetic': 'Stage 1: Synthetic Data',
            'real': 'Stage 2: Real Data',
        },
        'columns': 2,
        'is_demo': true,
        'current_scene': null,
        'description': `To train our track-conditioned V2V model, a major challenge lies in the scarcity of ideal, annotated video pairs for motion manipulation.
                        To tackle this, we adopt a two-stage fine-tuning approach. Click the buttons below to see the training data used in each stage.`,
        'method_descriptions': {
            'synthetic': `Our model is first fine-tuned on the synthetic data with ground-truth point tracks to learn motion control. Each video pair shares the same objects and background scenes but differs in object actions and camera motions.`,
            'real': `We continue fine-tuning on real data by sampling two non-contiguous clips from a monocular video (as illustrated), leveraging its natural motion to scalably simulate joint camera and object motion changes. Please note: The examples shown are from publicly available videos, not our internal training data.
                    <br><span class="description-real-data-illustration"><img src="./assets/images/traindata-real.svg"></span>`,
        }
    },
    'model-analysis': {
        'methods': ['2dvs3d', 'tokenvis', 'sparsity', 'noisiness', 'text-prompt', 'seeds'],
        'scenes': ['ride-horse', 'woman-yellow-wall', 'three-skaters', 'sea-turtle', 'taichi', 'toy-dinosaurs', 'wallaby', 'dog-beach', 'woman-yoga'],
        'method_buttons': {
            'sparsity': 'Sparsity of tracks',
            'noisiness': 'Noisiness of tracks',
            '2dvs3d': '2D vs 3D tracks',
            'tokenvis': 'Track token visualization',
            'text-prompt': 'Effect of texts',
            'seeds': 'Random seeds',
        },
        'modes': [
            'N=32', 'N=256', 'STD=4', 'STD=16',
        ],
        'enable_scenes': {
            'sparsity':     ['ride-horse', 'woman-yellow-wall'],
            'noisiness':    ['three-skaters', 'sea-turtle'],
            '2dvs3d':       ['taichi', 'toy-dinosaurs'],
            'tokenvis':     ['toy-dinosaurs'],
            'text-prompt':  ['wallaby', 'dog-beach'],
            'seeds':        ['woman-yoga'],
        },
        'enable_modes': {
            'sparsity':     [],
            'noisiness':    [],
            '2dvs3d':       [],
            'tokenvis':     [],
            'text-prompt':  [],
            'seeds':        [],
        },
        'method_columns': {
            'sparsity':     [['Input', 'N=1024', 'N=256', 'N=32']],
            'noisiness':    [['Input', 'STD=0', 'STD=4', 'STD=16']],
            '2dvs3d':       [['ref', '3D', '2D']],
            'text-prompt':  [['Input', 'prompt1', 'prompt2']],
            'seeds':        [['Input', 'seed0', 'seed1', 'seed2']],
            'tokenvis':     [['Input', 'left', 'right']],
        },
        'column_labels': {
            '2dvs3d': {
                'taichi': {'ref': 'Target motion', '3D': 'Model with 3D tracks (Ours)', '2D': 'Model with 2D tracks'},
                'toy-dinosaurs': {'ref': 'Target motion warped<br>(left dinosaur in front)', '3D': 'Model with 3D tracks (Ours)', '2D': 'Model with 2D tracks'},
            },
            'text-prompt': {
                'dog-beach': {'Input': 'Input', 'prompt1': '\"a dog jumps on a beach, causing water splashes.\"', 'prompt2': '\"A dog jumps on a sticky honey without splashes\"'},
                'wallaby': {'Input': 'Input', 'prompt1': '\"A wallaby in a zoo\"', 'prompt2': '\"A wallaby on a beach\"'},
            },
            'seeds': {
                'woman-yoga': {'Input': 'Input', 'seed0': 'Seed 0', 'seed1': 'Seed 1', 'seed2': 'Seed 2'}
            },
            'tokenvis': {
                'toy-dinosaurs': {'Input': 'Input', 'left': 'Left dinosaur in front', 'right': 'Right dinosaur in front'}
            }
        },
        'method_descriptions': {
            '2dvs3d': `
                        We compare our final model using 3D tracks with an ablated version trained only with 2D tracks.
                        <br><br>
                        The 3D track inputs provide crucial depth cues, enabling the model to correctly handle <a onclick="selectSceneByName('model-analysis', 'taichi', '2dvs3d')">complex 3D rotations during human motion transfer</a>
                        and <a onclick="selectSceneByName('model-analysis', 'toy-dinosaurs', '2dvs3d')">depth ordering (tracks visualized with depth values)</a>.
                        <br><br>
                        Top row: video; bottom row: Track overlay.
                    `,
            'tokenvis': `
                        We visualize the paired track tokens from our 3D track conditioner using PCA.
                        <br><br>
                        The 3rd row shows the tokens <i>before</i> adding the z-embedding, which primarily capture rich visual context sampled from the input video.
                        <br><br>
                        The 4th row shows the final tokens <i>after</i> adding the z-embedding. These now contain additional depth cues (e.g., in the visualization, darker colors represent closer objects). 
                    `,
            'sparsity': `
                        Our model is trained on a random number of point tracks between [500, 1000], and we test its robustness to sparser inputs not seen during training.
                        <br><br>
                        While extremely sparse inputs (N=32) can cause motion artifacts and undesired generation due to insufficient correspondences,
                        a denser sparse input (N=256)—though still sparser than the training range—significantly enhances motion control and visual quality.
                    `,
            'noisiness': `
                        To account for potential noise and inaccuracies in estimated 3D tracks and camera poses, we test our model's robustness to perturbed inputs.
                        This experiment involves adding varying amounts of Gaussian noise to the target point tracks.
                        <br><br>
                        Our model maintains satisfactory motion control and visual quality with mild noise (STD=4px),
                        but excessive noise (STD=16px) leads to noticeable artifacts and diminished control accuracy.
                    `,
            'text-prompt': `
                        While our model primarily relies on 3D track conditions for precise motion control,
                        text prompts can provide supplementary context.
                        This is particularly useful for generating <a onclick="selectSceneByName('model-analysis', 'wallaby', 'text-prompt')">unseen regions</a> or adding fine-grained details (e.g., <a onclick="selectSceneByName('model-analysis', 'dog-beach', 'text-prompt')">water effects</a>).
                    `,
            'seeds': `
                        Using different random seeds leads to slight variations in the output.
                        Please note that all above results shown on this webpage are generated using the same seed (=0).
            `,
        },
        'is_demo': false,
        'is_comparison': false,
    }
}


$(document).ready(function () {
    category_names = [
        'teaser',
        'joint-motion',
        'shape-deform',
        'removal-duplicate',
        'partial',
        'threed-control',
        'failures',
        'traindata',
        'comparisons',
        'model-analysis',
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
    'navbar-apps': ["sec:joint-motion", "sec:shape-deform", "sec:removal-duplicate", "sec:partial"],
    'navbar-method': ["sec:comparison", "sec:framework", "sec:traindata", "sec:threed-control", "sec:model-analysis", "sec:failures"],
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


// $(window).scroll(function(){
//     updateNavbarsOnScroll();
// });


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
        if (!is_mobile) {
            instruction = `
            <div class='has-text-centered demo-video-instruction'>
                <div class="instruction-centered">
                    <p>
                        <span class="icon">
                            <i class="far fa-hand-paper"></i>
                        </span>Hover on video to show tracks
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="icon">
                            <i class="far fa-hand-point-up"></i>
                        </span>Click video to pause
                        &nbsp;&nbsp;&nbsp;&nbsp;                        
                        <span class="icon">
                            <i class="fas fa-download"></i>
                        </span>Download [<u><a id="${category_name}-download-video" target="_blank" href="" download="">video</a></u> / 
                            <u><a id="${category_name}-download-video-tracks" target="_blank" href="" download="">video with track</a></u>]
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
                            <i class="far fa-hand-point-up"></i>
                        </span>Touch video to toggle track overlay
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

    current_filename = category_examples[category_name]['current_scene'];
    if (current_filename == null) {
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
    } else if (current_filename != filename) {
        video_container.innerHTML = video_container.innerHTML.replaceAll(current_filename, filename);
    }
    category_examples[category_name]['current_scene'] = filename;
    var video_active0 = document.getElementById(category_name + "Video0");
    var video_active1 = document.getElementById(category_name + "Video1");

    video_active0.load();
    video_active1.load();
    function _play_together() {
        if (video_active0.readyState >= 4 && video_active1.readyState >= 4) {
            video_active0.play();
            video_active1.play();
        } else {
            setTimeout(_play_together, 100);
        }
    }
    _play_together();

    // Reinitialize twentytwenty if needed
    two_column_ratio = 0.285;
    three_column_ratio = 0.19;
    if (category_examples[category_name]['columns'] == 2) {
        ratio = two_column_ratio;
    } else if (category_examples[category_name]['columns'] == 3) {
        ratio = three_column_ratio;
    } else {
        ratio = two_column_ratio;
    }

    if (window.jQuery && $.fn.twentytwenty) {
        $("#" + category_name + "-video-twentytwenty").twentytwenty({ ratio: ratio, hover_to_leftmost: true, default_offset_pct: 0.999, disable_resize: true, is_mobile: is_mobile  });
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

function loadComparisonVideoContainer(video_container, category_name, method_name, pill) {

    label1 = category_examples[category_name]['labels'][pill][0];
    label2 = category_examples[category_name]['method_labels'][method_name];

    current_scene = category_examples[category_name]['current_scene'];
    current_method = category_examples[category_name]['current_method'];

    init_sync = true;

    if (current_scene == null || current_method == null) {
        video_container.innerHTML = `
            <div class="columns">
                <div class="column comparison-video-div">
                    <video class="comparison-video"  loop playsinline muted>
                        <source src="./assets/videos/${category_name}/${pill}/input.mp4" />
                    </video>
                    <div class="has-text-centered demo-video-label">
                        Input
                    </div>
                </div>
                <div class="column comparison-video-div">
                    <video class="comparison-video"  loop playsinline muted id="video-comparison-ref">
                        <source src="./assets/videos/${category_name}/${pill}/ref.mp4" />
                    </video>
                    <div class="has-text-centered demo-video-label">
                        ${label1}
                    </div>
                </div>
            </div>
            <div class="columns">            
                <div class="column comparison-video-div">
                    <video class="comparison-video"  loop playsinline muted id="video-comparison-baseline">
                        <source src="./assets/videos/${category_name}/${pill}/${method_name}.mp4" id="src-comparison-baseline" />
                    </video>
                    <div class="has-text-centered demo-video-label">
                        ${label2}
                    </div>
                </div>
                <div class="column comparison-video-div">
                    <video class="comparison-video"  loop playsinline muted>
                        <source src="./assets/videos/${category_name}/${pill}/Ours.mp4" />
                    </video>
                    <div class="has-text-centered demo-video-label">
                        Ours
                    </div>
                </div>
            </div>
        `;
    } else if (current_method != method_name && current_scene == pill) {
        // only replace the baseline video while keep playing other videos
        document.getElementById('src-comparison-baseline').src = `./assets/videos/${category_name}/${pill}/${method_name}.mp4`;
        vid_baseline_ele = document.getElementById('video-comparison-baseline');
        vid_baseline_ele.load();
        vid_ref_ele = document.getElementById('video-comparison-ref');
        vid_baseline_ele.currentTime = vid_ref_ele.currentTime;
        if (!vid_ref_ele.paused)
            vid_baseline_ele.play();
        init_sync = false;
        
    } else {
        console.log('replace comparison videos');
        video_container.innerHTML = video_container.innerHTML
            .replaceAll(category_examples[category_name]['labels'][current_scene][0], label1)
            .replaceAll(category_examples[category_name]['method_labels'][current_method], label2)
            .replaceAll(current_scene, pill)
            .replaceAll(current_method, method_name);
    }
    category_examples[category_name]['current_scene'] = pill;
    category_examples[category_name]['current_method'] = method_name;
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
    if (enable_scenes && enable_scenes[method] && enable_scenes[method].length == 1) {
        document.getElementById(category_name + "-scene-pills").style.display = "none";
    } else {
        document.getElementById(category_name + "-scene-pills").style.display = "block";
    }

    first_active_scene_btn = null;
    for (let i = 0; i < scenes.length; i++) {
        btn_scene = document.getElementById(category_name + "-scene-" + scenes[i]);
        if (enable_scenes && enable_scenes[method] && !enable_scenes[method].includes(scenes[i])) {
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
        loadComparisonVideoContainer(video_container, category_name, method, scene);
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

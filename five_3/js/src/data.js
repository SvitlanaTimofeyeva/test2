var data = [
[
    {
        title: 'Basic Organization Information',
        subtitle: '',
        placeholders: [' Employer Identification Number (EIN)*',
        'Full legal name of the organization*',
        'Your organization is also known as (AKA)',
        'Please add your organization mission statement here.',
        'Please include your organization history',
        'Please describe your organization\'s work',
        'Add a tagline for your organization',
        'Please insert your organization logo here.',
        'Number of staff at your organization',
        'Primary contact Full Name',
        'Primary contact email',
        'Primary contact phone number',
        'Can an individual or an organization contact you regarding your organization'
        ],
        all_placeholders: [],
        types: ['i', 'i', 'i', 't', 't', 't', 'i', 'f', 'i', 'i', 'i', 'i', 'r'],
        style: 'regular',
        f_name: '',
        l_name: '', 
        prompts: ['Enter this 9-digit number using the following format XX-XXXXXXX. EIN is an Employer Identification Number assigned by the IRS to identify a particular organization',
        null, null, '30 words limit', '30 words limit', '50 words limit', null, null, null, 'First name and last name', null, null, ' '],
        values: [],
        patterns: ['nums', 'text', 'text', '30', '30', '50', 'text', 'file', 'nums', 'name', 'email', 'phone', 'text'],
        required: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        info: ['format', null, null, null, null, null, null, null, null, 'name', null, null, 'radio'],
        formats: ['9'],
        data: [],
        detail: '00',
        view: 0,
        add: 1,
        addable: false

    },
    {
        title: 'Address',
        subtitle: '',
        style: 'drop',
        placeholders: ['Address'],
        drop_placeholders: ['Main/physical address*', 'Building/suite number', 'State', 'City', 'Zip Code', 'Country', 'Is this your primary address?'],
        all_placeholders: ['Main/physical address*', 'Building/suite number', 'State', 'City', 'Zip Code', 'Country', 'Is this your primary address?'],
        types: ['i', 'i', 'i', 'i', 'i', 'i', 'r'],
        prompts: [null],
        values: [],
        f_name: '',
        l_name: '',
        formats: ['zip'],
        patterns: ['text', 'nums', 'text', 'text', 'zip', 'text', 'text'],
        required: [1, 0, 0, 0, 0, 0, 0, 0],
        info: ['format'],
        data: [],
        detail: '01',
        view: 0,
        add: 0,
        max: 2,
        addtext: 'If you have more than 1 serving address, please add here.'

    },

        {
            title: 'Address 2',
            subtitle: '',
            style: 'drop',
            placeholders: ['Address'],
            all_placeholders: ['Main/physical address*', 'Building/suite number', 'State', 'City', 'Zip Code', 'Country', 'Is this your primary address?'], 
            drop_placeholders: ['Main/physical address*', 'Building/suite number', 'State', 'City', 'Zip Code', 'Country', 'Is this your primary address?'],
            types: ['i', 'i', 'i', 'i', 'i', 'i', 'r'],
            prompts: [null],
            f_name: '',
            l_name: '',
            values: [],
            formats: ['zip'],
            patterns: ['text', 'text', 'text', 'text', 'zip', 'text', 'text', 'text'],
            required: [1, 0, 0, 0, 0, 0, 0, 0],
            info: ['format'],
            data: [],
            detail: '01',
            view: 1,
            add: 1


        },


    {
        title: 'Fiscal Year Information',
        subtitle: '12-month period in which an organization plans to use its funds. This description will appear and be visible to the public.',
        placeholders: [null, null, null, null, null],
        all_placeholders: ['Fiscal year start month*', 'Fiscal year end month*', 'Asset Amount', 'Asset Amount Year', 'Revenue Amount', 'Revenue Amount Year',
        'Income Amount', 'Income Amount Year', 'Year when your organization was founded*', 'Year when your organization was incorporated'],
        prompts: [null],
        values: [],
        required: [],
        style: 'multi',
        f_name: '',
        l_name: '',
        info: [],
        formats: [],
        patterns: [],
        types: ['i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i'],
        multi: [
            {
                placeholders: [
                'Fiscal year start month*', 'Fiscal year end month*'
                ],
                prompts: [],
                patterns: ['text', 'text'],
                formats: ['month', 'month'],
                data: []
            },
                    {
                        placeholders: [
                        'Asset Amount', 'Asset Amount Year'
                        ],
                        prompts: ['Asset amount is an amount from the most recent 990 return by your organization', 'Please add the year that corresponded to your organization’s asset amount.'],
                        patterns: ['nums', 'nums'],
                        formats: ['dollar', 'dollar'],
                        data: []
                    },
                    {
                        placeholders: ['Revenue Amount', 'Revenue Amount Year'],
                        prompts: ['Revenue amount is an amount from the most recent 990 return by your organization', 'Please add the year that corresponded to your organization’s revenue amount.'],
                        patterns: ['nums', 'nums'],
                        formats: ['dollar', 'dollar'],
                        data: []
                    },
                    {
                        placeholders: ['Income Amount', 'Income Amount Year'],
                        prompts: ['Income amount is an amount from the most recent 990 return by your organization.', 'Please add the year that corresponded to your organization income amount.'],
                        patterns: ['nums', 'nums'],
                        formats: ['dollar', 'dollar'],
                        data: []
                    },
                    {
                        placeholders: ['Year when your organization was founded*', 'Year when your organization was incorporated'],
                        prompts: [],
                        patterns: [],
                        patterns: ['nums', 'nums'],
                        formats: ['year', 'year'],
                        data: []
                    }
        ],
        data: [],
        detail: '02',
        view: 0,
        add: 1

    },
            {
                title: 'National Taxonomy of Exempt Entities (NTEE)',
                subtitle: 'Please select service areas that best fit your organization. The National Taxonomy of Exempt Entities (NTEE) describes activities in support of nonprofit organizations.',
                placeholders: ['Select your organization type*', 'Service area of your organization*'],
                all_placeholders: [], 
                style: 'regular',
                types: ['d'],
                values: [[
                    'Nonprofit Organization',
                    'School',
                    'Faith Based organization',
                    'Association'

                ], [
                    'Health',
                    'Education'

                ]],
                prompts: [null, null],
                patterns: [],
                required: [],
                info: [null, 'multidrop'],
                drops: [[
                    'Community Health Systems',
                    'Hospital',
                    'Health Treatment Facilities, Primarily Outpatient',
                    'Reproductive Health Care Facilities and Allied Services',
                    'Family Planning Centers',
                    'Health Support Services'

                ], [
                    'Kindergarten, Preschool, Nursery School, Early Admissions',
                    'Primary, Elementary Schools',
                    'Secondary, High School',
                    'Vocational, Technical Schools',
                    'Higher Education Institutions',
                    'Community or Junior Colleges'

                ]],
                data: [],
                detail: '03',
                view: 0,
                add: 1
            },
            {
                title: 'Region(s) that your organization currently serves',
                placeholders: ['Geographic area(s) served by this program*', '5 digit zip code of the regions you serve*'],
                all_placeholders: [], 
                types: ['i', 'i'],
                prompts: [null],
                style: 'regular',
                f_name: '',
                l_name: '',
                values: [],
                patterns: ['text', 'nums'],
                required: [1, 0],
                info: [null, 'format'],
                formats: [null, "zip"],
                data: [],
                detail: '04',
                view: 0,
                add: 1
            },
            {
                title: 'Leadership Information',
                subtitle: 'You can add up to three (3) main leadership profiles to your profile. This information will appear and be visible to the public.',
                placeholders: ['Leadership Full Name', 'Leadership Job Title', 'Leadership Bio', 'Leadership Picture', 'Leadership Contact Phone with extension', 'Leadership Contact Email'],
                all_placeholders: [], 
                types: ['i', 'i', 't', 'f', 'i', 'i'],
                style: 'regular',
                f_name: '',
                l_name: '',
                prompts: ['Your current senior leadership information. Please add them according to their hierarchy level. It can be your Executive Director/President/CEO, board chair/president and so forth.',
                null, 'Please provide up to 50 word professional bio of your senior leadership team'],
                values: [],
                patterns: ['name', 'text', '50', 'text', 'phone', 'email'],
                required: [0, 0, 0, 0, 0],
                info: ['name', null, null, 'leadership-pic', null, null],
                formats: [null, null, null],
                data: [],
                detail: '05',
                view: 0,
                add: 0,
                max: 2,
                addtext: 'Add leadership profile'
            },
             {
                 title: 'Leadership Information 2',
                 subtitle: '',
                 placeholders: ['Leadership Full Name', 'Leadership Job Title', 'Leadership Bio', 'Leadership Picture', 'Leadership Contact Phone with extension', 'Leadership Contact Email'],
                 all_placeholders: [],
                 types: ['i', 'i', 't', 'f', 'i', 'i'],
                 style: 'regular',
                 f_name: '',
                 l_name: '',
                 prompts: ['Your current senior leadership information. Please add them according to their hierarchy level. It can be your Executive Director/President/CEO, board chair/president and so forth.',
                 null, 'Please provide up to 50 word professional bio of your senior leadership team'],
                 values: [],
                 patterns: ['name', 'text', '50', 'text', 'phone', 'email'],
                 required: [0, 0, 0, 0, 0],
                 info: ['name', null, null, 'leadership-pic', null, null],
                 formats: [null, null, null],
                 data: [],
                 detail: '05',
                 view: 1,
                 add: 0,
                 max: 2,
                 addtext: 'Add leadership profile'
             },
             {
                 title: 'Leadership Information 3',
                 subtitle: '',
                 placeholders: ['Leadership Full Name', 'Leadership Job Title', 'Leadership Bio', 'Leadership Picture', 'Leadership Contact Phone with extension', 'Leadership Contact Email'],
                 all_placeholders: [], 
                 types: ['i', 'i', 't', 'f', 'i', 'i'],
                 style: 'regular',
                 prompts: ['Your current senior leadership information. Please add them according to their hierarchy level. It can be your Executive Director/President/CEO, board chair/president and so forth.',
                 null, 'Please provide up to 50 word professional bio of your senior leadership team'],
                 values: [],
                 f_name: '',
                 l_name: '',
                 patterns: ['name', 'text', '50', 'text', 'phone', 'email'],
                 required: [0, 0, 0, 0, 0],
                 info: ['name', null, null, 'leadership-pic', null, null],
                 formats: [null, null, null],
                 data: [],
                 detail: '05',
                 view: 1,
                 add: 1
             }
    ]
];



function get_data($scope) {
	


            $scope.inputs = JSON.stringify(data[0])


			
            $scope.refresh_data = function (obj, i) {
                data[0][i] = obj;
                return data;
            }
            $scope.set_view = function (i) {
                data[0][i+1].view = 0; 
            }

            return data;
}

module.exports = get_data; 
